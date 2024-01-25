import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../Utils";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import {
  Bucket,
  BucketAccessControl,
  HttpMethods,
  IBucket,
  ObjectOwnership,
} from "aws-cdk-lib/aws-s3";
import {
  AnyPrincipal,
  ArnPrincipal,
  Effect,
  PolicyStatement,
} from "aws-cdk-lib/aws-iam";
import { Anyone } from "@aws-cdk/aws-iam";

export class DataStack extends Stack {
  private readonly table: ITable;
  private readonly photoBucket: IBucket;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);

    this.table = new Table(this, `BookKeepTable`, {
      tableName: `BookKeepTable${suffix}`,
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
    });

    this.photoBucket = new Bucket(this, "BookKeepPhotoBucket", {
      bucketName: `book-keep-photo-bucket-${suffix}`,
      cors: [
        {
          allowedMethods: [HttpMethods.HEAD, HttpMethods.GET, HttpMethods.PUT],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
        },
      ],
      objectOwnership: ObjectOwnership.OBJECT_WRITER,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
    });

    const photoBucketPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      principals: [new AnyPrincipal()],
      actions: ["s3:PutObject", "s3:PutObjectAcl", "s3:GetObject"],
      resources: [`${this.photoBucket.bucketArn}/*`],
    });

    this.photoBucket.addToResourcePolicy(photoBucketPolicy);
  }

  public getTable(): ITable {
    return this.table;
  }

  public getPhotoBucket(): IBucket {
    return this.photoBucket;
  }
}
