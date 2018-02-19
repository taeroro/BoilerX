import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";
/**
 * @api {get} /user/current Get information of the current user.
 * @apiName getItemsPrice
 * @apiGroup content
 *  
 * @apiSuccess {Object} "" a JSON object of user info.
 * @apiSuccess {JSON} status false
 */
export async function main(event, context, callback) {
  const params = {
    TableName: "User",
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
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