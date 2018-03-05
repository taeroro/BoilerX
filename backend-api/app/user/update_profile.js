import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  let update_expr = "SET #username = :username, ";
  update_expr += "#imageURL = :imageURL";

  const params = {
    TableName: "User",
    Key: {
        userId: event.requestContext.identity.cognitoIdentityId
    },
    ConditionExpression: 'userId = :userIdVal',
    UpdateExpression: update_expr,
    ExpressionAttributeNames: {
      "#username": "username",
      "#imageURL": "imageURL"
    },
    ExpressionAttributeValues: {
      ":userIdVal": event.requestContext.identity.cognitoIdentityId,
      ":username": data.username ? data.username : null,
      ":imageURL": data.imageURL ? data.imageURL : null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    callback(null, success(result));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}