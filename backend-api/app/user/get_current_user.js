import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: "User",
    Key: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    // Return current user in response body
    if (result.Items.size > 1) {
      callback(null, failure({ 
        status: false,
        message: "multiple user with identical id."
       }));
    }
    callback(null, success(result.Items[0]));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}