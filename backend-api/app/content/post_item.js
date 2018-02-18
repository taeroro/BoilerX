import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";
/**
 * @apiDefine body parameter from request body
 */
/**
 * @api {post} /content/post post an item for sell.
 * @apiName postItem
 * @apiGroup content
 * 
 * @apiParam (body) {String} name Name of the item.
 * @apiParam (body) {String} [category] Category of the item. later we shall predefine our categories.
 * @apiParam (body) {String} [subject] Subject of the item.
 * @apiParam (body) {String} sellerName Seller's name. Please call user/current to get the username.
 * @apiParam (body) {String} price Price of the item.
 * @apiParam (body) {Number} [crn] CRN of the class of which use the book.
 * @apiParam (body) {String} [imageURL] url of the image in S3 bucket.
 * @apiParam (body) {String} [descr] Description of the item.
 * 
 * @apiSuccess {JSON} status true
 * @apiSuccess {JSON} status false
 */
export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  if (!data.name || !data.price || !sellerName) {
    callback(null, failure({ 
      status: false, 
      message: "missing required parameters"
    }));
    return;
  }
  const params = {
    TableName: "Item",
    Item: {
      sellerId: event.requestContext.identity.cognitoIdentityId,
      itemID: uuid.v1(),
      name: data.name,
      searchName: String(data.name).toLowerCase(),
      popularity: 0,
      category: data.category ? String(data.category).toLowerCase() : undefined,
      subject: data.subject ? String(data.subject).toLowerCase() : undefined,
      sellerName: data.sellerName,
      price: Number(data.price),
      crn: data.crn? Number(data.crn): null,
      // may set default in S3
      imageURL: data.imageURL,
      descr: data.descr,
      createdAt: new Date().getTime()
    }
    
  };
  console.log(params);
  try {
    const result = await dynamoDbLib.call("put", params);
    console.log("success");
    callback(null, success({ status: true }));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}