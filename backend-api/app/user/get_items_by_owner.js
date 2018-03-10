import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  
  const params = {
    TableName: "Item",
    IndexName: "sellerID-itemID-index",
    KeyConditionExpression: "#sellerID = :sellerID",
    ExpressionAttributeNames: {
        "#sellerID": "sellerID"
    },
    ExpressionAttributeValues: {
        ":sellerID": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    if (result.Items) {
      // Return the retrieved item
      callback(null, success(result.Items));
    } else {
      callback(null, failure({ status: false, error: "Item not found." }));
    }
  } catch (e) {
    callback(null, failure(e));
  }

}