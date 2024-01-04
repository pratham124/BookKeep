import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { join } from "path";

interface LambdaStackProps extends StackProps {
  bookTable: ITable;
}

export class LambdaStack extends Stack {
  private readonly lambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const lambda = new NodejsFunction(this, "BookKeepLambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: join(__dirname, "..", "..", "services", "books", "main.ts"),
      handler: "handler",
      environment: {
        TABLE_NAME: props.bookTable.tableName,
      },
      timeout: Duration.minutes(1),
    });
    lambda.addToRolePolicy(
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

    this.lambdaIntegration = new LambdaIntegration(lambda);
  }

  public getLambdaIntegration(): LambdaIntegration {
    return this.lambdaIntegration;
  }
}

const p = join(__dirname, "..", "..", "services", "books", "main.ts");
console.log(p);
