import { CfnOutput, Stack } from "aws-cdk-lib";
import {
  CfnIdentityPool,
  CfnIdentityPoolRoleAttachment,
  IUserPool,
  UserPool,
} from "aws-cdk-lib/aws-cognito";
import { FederatedPrincipal, Role } from "aws-cdk-lib/aws-iam";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

interface AuthStackProps {
  PreSignupLambda: NodejsFunction;
}

export class AuthStack extends Stack {
  private readonly userPool: UserPool;

  constructor(scope: Construct, id: string, props: AuthStackProps) {
    super(scope, id);

    this.userPool = new UserPool(this, "BookKeepUserPool", {
      userPoolName: "BookKeepUserPool",
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
        username: true,
      },
      lambdaTriggers: {
        preSignUp: props.PreSignupLambda,
      },
    });

    new CfnOutput(this, "UserPoolId", {
      value: this.userPool.userPoolId,
    });

    const userPoolClient = this.userPool.addClient("BookKeepUserPoolClient", {
      userPoolClientName: "BookKeepUserPoolClient",
      authFlows: {
        adminUserPassword: true,
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
          providerName: this.userPool.userPoolProviderName,
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

  public getUserPool(): IUserPool {
    return this.userPool;
  }
}
