import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../Utils";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import {
  Bucket,
  BucketAccessControl,
  IBucket,
  ObjectOwnership,
} from "aws-cdk-lib/aws-s3";

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
      objectOwnership: ObjectOwnership.OBJECT_WRITER,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
    });
  }

  public getTable(): ITable {
    return this.table;
  }

  public getPhotoBucket(): IBucket {
    return this.photoBucket;
  }
}
