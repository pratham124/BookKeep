import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export default async function deleteBook(
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
  const res = await dbClient.send(
    new DeleteItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        id: {
          S: bookId,
        },
      },
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Book ${bookId} deleted successfully`,
    }),
  };
}
