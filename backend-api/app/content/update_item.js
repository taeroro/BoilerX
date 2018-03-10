import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";
/**
 * @apiDefine body parameter from request body
 */
/**
 * @api {post} /content/post post an item for sell.
 * @apiName postItem
 * @apiGroup content
 * @apiParam (body) {String} itmeID Unique item id assigned when the item is posted.
 * @apiParam (body) {String} [name] Name of the item.
 * @apiParam (body) {String} [category] Category of the item. later we shall predefine our categories.
 * @apiParam (body) {String} [subject] Subject of the item.
 * @apiParam (body) {String} [sellerName] Seller's name. Please call user/current to get the username.
 * @apiParam (body) {String} [price] Price of the item.
 * @apiParam (body) {Number} [crn] CRN of the class of which use the book.
 * @apiParam (body) {String} [imageURL] url of the image in S3 bucket.
 * @apiParam (body) {String} [descr] Description of the item.
 * @apiParam (body) {String[]} [tags] Array of tags of the item.
 * 
 * @apiSuccess {JSON} status true
 * @apiSuccess {JSON} status false
 */
export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  let update_expr = "SET #name = :name, ";
  update_expr += "#searchName = :searchName, ";
  update_expr += "#category = :category, ";
  update_expr += "#subject = :subject, ";
  update_expr += "#price = :price, ";
  update_expr += "#crn = :crn, ";
  update_expr += "#imageURL = :imageURL, ";
  update_expr += "#descr = :descr, ";
  update_expr += "#tags = :tags";
  const params = {
    TableName: "Item",
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      itemID: event.pathParameters.itemID
    },
    ConditionExpression: 'itemID = :itemIDVal',
    UpdateExpression: update_expr,
    ExpressionAttributeNames: {
      "#name": "name",
      "#searchName": ":searchName",
      "#category": "category",
      "#subject": "subject",
      "#price": "price",
      "#crn": "crn",
      "#imageURL": "imageURL",
      "#descr": "descr",
      "#tags": "tags"
    },
    ExpressionAttributeValues: {
      ":itemIDVal": event.pathParameters.itemID,
      ":name": data.name ? data.name : null,
      ":searchName": data.name ? String(data.name).toLowerCase() : null,
      ":category": data.category ? String(data.category).toLowerCase() : null,
      ":subject": data.subject ? String(data.subject).toLowerCase() : null,
      ":price": data.price ? Number(data.price) : null,
      ":crn": data.crn ? Number(data.crn) : null,
      ":imageURL": data.imageURL ? data.imageURL : null,
      ":descr": data.descr ? data.descr : null,
      ":tags": data.tags ? dynamoDbLib.createSet(data.tags) : null
    },
    ReturnValues: "ALL_NEW"
  };

  console.log(params);
  try {
    const result = await dynamoDbLib.call("update", params);
    //console.log(result);
    callback(null, success(result));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}