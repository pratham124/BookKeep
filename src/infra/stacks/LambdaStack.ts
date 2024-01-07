import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import {
  Effect,
  FederatedPrincipal,
  PolicyStatement,
} from "aws-cdk-lib/aws-iam";
import { join } from "path";

interface LambdaStackProps extends StackProps {
  bookTable: ITable;
}

export class LambdaStack extends Stack {
  private readonly BookLambdaIntegration: LambdaIntegration;
  private readonly PreSignupLambda: NodejsFunction;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const bookLambda = new NodejsFunction(this, "BookKeepLambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: join(__dirname, "..", "..", "services", "books", "main.ts"),
      handler: "handler",
      environment: {
        TABLE_NAME: props.bookTable.tableName,
      },
      timeout: Duration.minutes(1),
    });
    bookLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Scan",
        ],
        resources: [props.bookTable.tableArn],
      })
    );

    this.BookLambdaIntegration = new LambdaIntegration(bookLambda);

    this.PreSignupLambda = new NodejsFunction(this, "PreSignupLambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: join(__dirname, "..", "..", "services", "auth", "presignup.ts"),
      handler: "handler",
      timeout: Duration.minutes(1),
    });
  }

  public getLambdaIntegration(): LambdaIntegration {
    return this.BookLambdaIntegration;
  }

  public getPreSignupLambda(): NodejsFunction {
    return this.PreSignupLambda;
  }
}
