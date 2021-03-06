import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";
/**
 * @apiDefine query parameter from request query
 */
/**
 * @api {get} /content/item_price Get items fullfilling conditons ranked by price.
 * @apiName getItemsPrice
 * @apiGroup content
 * 
 * @apiParam (query) {String} keyword Search keyword.
 * @apiParam (query) {String} [category] Category of the item. later we shall predefine our categories.
 * @apiParam (query) {String} [subject] Subject of the item.
 * @apiParam (query) {Number} [crn] CRN of the class of which use the book.
 * @apiParam (query) {Number[2]} [price] Price range of the item, price[0] is lower bound and price[1] is upper bound.
 * 
 * @apiSuccess {Object[]}
 * @apiSuccess {JSON} status false
 */
export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.queryParams);

  if (!data.keyword) {
    callback(null, failure({ 
      status: false, 
      message: "missing keyword"
    }));
    return;
  }
  let filter = "";
  let attr_name = {};
  let attr_value = {};
  let first = true;
  if (data.keyword) {
    first = false;
    filter += "contains (#name, :keyword)";
    attr_name["#name"] = "name";
    attr_value[":keyword"] = String(data.keyword).toLowerCase();
  } 
  if (data.category) {
    if (!first) {
      filter += " AND ";
    }
    first = false;
    filter += "#cat = :cat";
    attr_name["#cat"] = "category";
    attr_value[":cat"] = String(data.category).toLowerCase();
  }
  if (data.price) {
    if (!first) {
      filter += " AND ";
    }
    first = false;
    filter += "#price BETWEEN :a AND :b";
    attr_name["#price"] = "price";
    attr_value[":a"] = Number(data.price[0]);
    attr_value[":b"] = Number(data.price[1]);
  }
  if (data.subject) {
    if (!first) {
      filter += " AND ";
    }
    first = false;
    filter += "#sub = :sub";
    attr_name["#sub"] = "subject";
    attr_value[":sub"] = String(data.subject).toLowerCase();
  }
  if (data.crn) {
    if (!first) {
      filter += " AND ";
    }
    first = false;
    filter += "#crn = :crn";
    attr_name["#crn"] = "crn";
    attr_value[":crn"] = data.crn;
  }
  const params = {
    TableName: "Item",
    //ProjectionExpression: "Subject, LastPostDateTime, Replies, Tags",
    FilterExpression: filter,
    ExpressionAttributeNames: attr_name,
    ExpressionAttributeValues: attr_value
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    console.log("success");
    result.Items.sort(function(a, b) {
      return parseInt(a.price) - parseInt(b.price);
    });
    //callback(null, success(result.Items));
    callback(null, success('good'));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}