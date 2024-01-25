import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { randomBytes } from "crypto";
import { Book } from "../../types/Book";

export default async function postBook(
  event: APIGatewayProxyEvent,
  dbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const req = JSON.parse(event.body);
  req.id = randomBytes(16).toString("hex");
  if (!req.title || !req.author || !req.userId || !req.id || !req.type) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing required fields",
      }),
    };
  }
  const book: Book = req;

  const res = await dbClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: marshall(book),
    })
  );

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: `Book ${book.id} created successfully`,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
}
