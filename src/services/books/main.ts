import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import getBook from "./requests/GetBook";
import getBooks from "./requests/GetBooks";
import postBook from "./requests/PostBook";
import deleteBook from "./requests/DeleteBook";
import putBook from "./requests/PutBook";

const dbClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let res: APIGatewayProxyResult;

  try {
    if (event.httpMethod === "GET") {
      if (event.queryStringParameters && event.queryStringParameters["id"]) {
        // Get a single book
        res = await getBook(event, dbClient);
      } else if (event.queryStringParameters) {
        res = await getBooks(event, dbClient);
      } else {
        throw new Error("Invalid Search Parameters");
      }
    } else if (event.httpMethod === "POST") {
      res = await postBook(event, dbClient);
    } else if (event.httpMethod === "DELETE") {
      res = await deleteBook(event, dbClient);
    } else if (event.httpMethod === "PUT") {
      res = await putBook(event, dbClient);
    } else {
      throw new Error("Invalid HTTP method");
    }

    return res;
  } catch (err) {
    console.error(err);
    return (res = {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message,
      }),
    });
  }
}

export { handler };
