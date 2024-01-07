import { CfnOutput, Stack } from "aws-cdk-lib";
import {
  CfnIdentityPool,
  CfnIdentityPoolRoleAttachment,
  UserPool,
} from "aws-cdk-lib/aws-cognito";
import { FederatedPrincipal, Role } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class AuthStack extends Stack {
  constructor(scope: Construct, id: string, props?: any) {
    super(scope, id);

    const userPool = new UserPool(this, "BookKeepUserPool", {
      userPoolName: "BookKeepUserPool",
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
        username: true,
      },
    });

    new CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
    });

    const userPoolClient = userPool.addClient("BookKeepUserPoolClient", {
      userPoolClientName: "BookKeepUserPoolClient",
      authFlows: {
        userPassword: true,
        userSrp: true,
        custom: true,
      },
    });

    new CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });

    const identityPool = new CfnIdentityPool(this, "BookKeepIdentityPool", {
      identityPoolName: "BookKeepIdentityPool",
      allowUnauthenticatedIdentities: false,
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: userPool.userPoolProviderName,
        },
      ],
    });

    const authenticatedRole = new Role(
      this,
      "CognitoDefaultAuthenticatedRole",
      {
        assumedBy: new FederatedPrincipal(
          "cognito-identity.amazonaws.com",
          {
            StringEquals: {
              "cognito-identity.amazonaws.com:aud": identityPool.ref,
            },
            "ForAnyValue:StringLike": {
              "cognito-identity.amazonaws.com:amr": "authenticated",
            },
          },
          "sts:AssumeRoleWithWebIdentity"
        ),
      }
    );

    new CfnIdentityPoolRoleAttachment(this, "RoleAttachment", {
      identityPoolId: identityPool.ref,
      roles: {
        authenticated: authenticatedRole.roleArn,
      },
    });

    new CfnOutput(this, "IdentityPoolId", {
      value: identityPool.ref,
    });
  }
}
