import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export default async function putBook(
  event: APIGatewayProxyEvent,
  dbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (!event.queryStringParameters || !event.queryStringParameters["id"]) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Book ID is required",
      }),
    };
  }

  const bookId = event.queryStringParameters["id"];
  const req = JSON.parse(event.body);
  const updateExpressionString =
    "SET " +
    Object.keys(req)
      .map((key) => `#${key} = :${key}`)
      .join(", ");

  const expressionAttributeValues = Object.keys(req).reduce((acc, key) => {
    acc[`:${key}`] = { S: req[key] };
    return acc;
  }, {});

  const expressionAttributeNames = Object.keys(req).reduce((acc, key) => {
    acc[`#${key}`] = key;
    return acc;
  }, {});

  const res = await dbClient.send(
    new UpdateItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        id: {
          S: bookId,
        },
      },
      UpdateExpression: `SET ${updateExpressionString}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ReturnValues: "UPDATED_NEW",
    })
  );

  return {
    statusCode: 204,
    body: JSON.stringify({
      message: `Book ${bookId} updated successfully`,
      book: res.Attributes,
    }),
  };
}
