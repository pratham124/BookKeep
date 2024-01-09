import { fetchAuthSession, signIn, signOut, signUp } from "@aws-amplify/auth";
import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: "75cu9ug9ar9bpqfhr2iesvle4n",
      userPoolId: "us-west-2_g6G9r7Rnj",
    },
  },
});

export class AuthService {
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

  public async tempCredentials() {}
}
