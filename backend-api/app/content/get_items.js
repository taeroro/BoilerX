import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";
/**
 * @api {get} /content Get top 5 items ranked by popularity for homepage.
 * @apiName getItems
 * @apiGroup content
 * 
 * @apiSuccess {Object[]}
 * @apiSuccess {JSON} status false
 */
export async function main(event, context, callback) {
  
  const params = {
    TableName: "Item"
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