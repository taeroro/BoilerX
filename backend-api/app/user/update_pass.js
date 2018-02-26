import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  if (!data.pass) {
    callback(null, failure({ 
      status: false, 
      message: "missing keyword"
    }));
    return;
  }
  const params = {
    TableName: "User",
    Key: {
        userId: event.requestContext.identity.cognitoIdentityId
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET #pass = :pass",
    ExpressionAttributeNames: {
      "#pass": "pass"
    },
    ExpressionAttributeValues: {
      ":imageURL": data.pass
    },
    ReturnValues: "ALL_NEW"
  };

  console.log(params);
  try {
    const result = await dynamoDbLib.call("update", params);
    //console.log(result);
    callback(null, success(result.Item));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}