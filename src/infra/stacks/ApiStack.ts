import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  bookLambdaIntegration: LambdaIntegration;
}

export default class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "BookApi");

    const books = api.root.addResource("books");
    books.addMethod("GET", props.bookLambdaIntegration);
    books.addMethod("POST", props.bookLambdaIntegration);
    books.addMethod("PUT", props.bookLambdaIntegration);
    books.addMethod("DELETE", props.bookLambdaIntegration);
  }
}
