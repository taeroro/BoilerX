import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {

  const params = {
    TableName: "Item",
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      itemID: event.pathParameters.itemID
    },
    ConditionExpression: 'itemID = :itemIDVal',
    UpdateExpression: "SET popularity = popularity + :val",
    ExpressionAttributeValues: {
        ":itemIDVal": event.pathParameters.itemID,
        ":val": 1
    }
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    //console.log(result);
    callback(null, success({ status: true }));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}