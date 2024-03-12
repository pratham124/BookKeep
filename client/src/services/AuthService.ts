import { fetchAuthSession, signIn, signOut, signUp } from "@aws-amplify/auth";
import { Amplify } from "aws-amplify";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: "75cu9ug9ar9bpqfhr2iesvle4n",
      userPoolId: "us-west-2_g6G9r7Rnj",
    },
  },
});

export class AuthService {
  private jwtToken: string | undefined;
  private temporaryCredentials: object | undefined;

  public async login(username: string, password: string) {
    try {
      await signOut();
      await signIn({
        username,
        password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        },
      });
      const { idToken } = (await fetchAuthSession()).tokens ?? {};
      const stringToken = idToken?.toString();
      return { token: stringToken, userId: idToken?.payload?.sub };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async signup(username: string, password: string) {
    try {
      await signUp({
        username,
        password,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async logout() {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async getTemporaryCredentials() {
    if (this.temporaryCredentials) {
      return this.temporaryCredentials;
    }
    this.temporaryCredentials = await this.generateTemporaryCredentials();
    return this.temporaryCredentials;
  }

  private async generateTemporaryCredentials() {
    const cognitoIdentityPool = `cognito-idp.us-west-2.amazonaws.com/`;
    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        clientConfig: {
          region: "us-west-2",
        },
        identityPoolId: "us-west-2:79fe5b15-916e-4b53-b0af-033b4e417cc0",
        logins: {
          [cognitoIdentityPool]: this.jwtToken!,
        },
      }),
    });
    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
  }
}
