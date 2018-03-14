import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  let update_expr = "SET #name = :name, ";
  update_expr += "#searchName = :searchName, ";
  update_expr += "#sellerName = :sellerName, ";
  update_expr += "#sellerEmail = :sellerEmail, ";
  update_expr += "#sellerImg = :sellerImg, ";
  update_expr += "#price = :price, ";
  update_expr += "#imageURL = :imageURL, ";
  update_expr += "#descr = :descr";
  const params = {
    TableName: "Item",
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      itemID: event.pathParameters.itemID
    },
    ConditionExpression: "itemID = :itemIDVal",
    UpdateExpression: update_expr,
    ExpressionAttributeNames: {
      "#name": "name",
      "#sellerName": "sellerName",
      "#searchName": ":searchName",
      "#sellerEmail": "sellerEmail",
      "#sellerImg": "sellerImg",
      "#price": "price",
      "#imageURL": "imageURL",
      "#descr": "descr"
    },
    ExpressionAttributeValues: {
      ":itemIDVal": event.pathParameters.itemID,
      ":name": data.name ? data.name : null,
      ":searchName": data.name ? String(data.name).toLowerCase() : null,
      ":sellerName": data.sellerName ? data.sellerName : null,
      ":sellerEmail": data.sellerEmail ? data.sellerEmail : null,
      ":sellerImg": data.sellerImg ? data.sellerImg: null,
      ":price": data.price ? Number(data.price) : null,
      ":imageURL": data.imageURL ? data.imageURL : null,
      ":descr": data.descr ? data.descr : null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    //console.log(result);
    callback(null, success(result));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}