import { Stack, StackProps } from "aws-cdk-lib";
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
  LambdaIntegration,
  MethodOptions,
  ResourceOptions,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  bookLambdaIntegration: LambdaIntegration;
  userPool: IUserPool;
}

export default class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "BookApi");

    const authorizer = new CognitoUserPoolsAuthorizer(this, "Authorizer", {
      cognitoUserPools: [props.userPool],
      identitySource: "method.request.header.Authorization",
    });
    authorizer._attachToApi(api);

    const auth: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: authorizer.authorizerId,
      },
    };

    const cors: ResourceOptions = {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    };

    const books = api.root.addResource("books", cors);

    books.addMethod("GET", props.bookLambdaIntegration, auth);
    books.addMethod("POST", props.bookLambdaIntegration, auth);
    books.addMethod("PUT", props.bookLambdaIntegration, auth);
    books.addMethod("DELETE", props.bookLambdaIntegration, auth);
  }
}
