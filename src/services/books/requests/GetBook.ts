import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Book } from "../../types/Book";

export default async function getBook(
  event: APIGatewayProxyEvent,
  dbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const bookId = event.queryStringParameters["id"];
  const res = await dbClient.send(
    new GetItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        id: {
          S: bookId,
        },
      },
    })
  );

  if (!res.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: `Book ${bookId} not found`,
      }),
    };
  }

  const book = unmarshall(res.Item) as Book;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Book ${bookId} retrieved successfully`,
      book,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
}
