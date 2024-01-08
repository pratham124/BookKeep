import { fetchAuthSession, signIn, signUp } from "@aws-amplify/auth";
import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: "75cu9ug9ar9bpqfhr2iesvle4n",
      userPoolId: "us-west-2_g6G9r7Rnj",
    },
  },
});

export class AuthTest {
  public async login() {
    const { isSignedIn, nextStep } = await signIn({
      username: "testuserjh",
      password: "Testuser2@",
      options: {
        authFlowType: "USER_PASSWORD_AUTH",
      },
    });
    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    console.log(idToken.toString);
    fetch("https://9ahmtltyr1.execute-api.us-west-2.amazonaws.com/prod/books", {
      method: "GET",
      headers: {
        Authorization: idToken.toString(),
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  public async signup() {
    const username = "testuserjh";
    const password = "Testuser2@";
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
    });

    console.log(userId);
  }

  public async tempCredentials() {}
}

const authTest = new AuthTest();
authTest.login();
