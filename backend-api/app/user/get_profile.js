import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  
  const params = {
    TableName: "User",
    Key: {
        userId: event.requestContext.identity.cognitoIdentityId
    },
    ProjectionExpression: "username, email, imageURL"
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      // Return the retrieved item
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: "Item not found." }));
    }
  } catch (e) {
    callback(null, failure({ status: false }));
  }

}