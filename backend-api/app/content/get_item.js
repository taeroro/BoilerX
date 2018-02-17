import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: "Item",
    Limit: 6
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    result.Items.sort(function(a, b) {
      return parseInt(b.popularity) - parseInt(a.popularity);
    });
    callback(null, success(result.Items));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}