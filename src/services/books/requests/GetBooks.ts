import {
  AttributeValue,
  DynamoDBClient,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export default async function getBooks(
  event: APIGatewayProxyEvent,
  dbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const filters = event.queryStringParameters;
  const filterExpressionString = Object.keys(filters)
    .map((key) => `#${key} = :${key}`)
    .join(" AND ");
  const expressionAttributeValues = Object.keys(filters).reduce((acc, key) => {
    acc[`:${key}`] = { S: filters[key] };
    return acc;
  }, {});
  const expressionAttributeNames = Object.keys(filters).reduce((acc, key) => {
    acc[`#${key}`] = key;
    return acc;
  }, {});

  const res = await dbClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
      FilterExpression: filterExpressionString,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
    })
  );

  const items = res.Items?.map((item) => unmarshall(item));

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Books retrieved successfully",
      items,
    }),
  };
}
