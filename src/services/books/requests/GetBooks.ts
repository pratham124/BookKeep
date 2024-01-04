import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export default async function getBooks(
  event: APIGatewayProxyEvent,
  dbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const res = await dbClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
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
