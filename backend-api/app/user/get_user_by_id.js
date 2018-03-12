import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: "User",
    Key: {
      userId: event.pathParameters.userId
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
        // Return the retrieved item
        callback(null, success(result.Item));
      } else {
        callback(null, failure({ status: false, error: "User not found." }));
      }
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}