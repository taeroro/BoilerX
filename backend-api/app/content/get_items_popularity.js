import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  
  const data = JSON.parse(event.query);

  /**
   * conditions include:
   * name: for search:  only one word allowed
   *    contains (Name, :keyword) 
   *    : return all items with name containing keyword as substring
   * category: string
   * price: range : parse in a 2 elements array [lower, upper]
   * subject:
   * crn: 
   */
  let filter = "";
  let attr_name = {};
  let attr_value = {};
  let first = true;
  if (data.keyword) {
    first = false;
    filter += "contains (#name, :keyword)";
    attr_name["#name"] = "name";
    attr_value[":keyword"] = data.keyword;
  } 
  if (data.category) {
    if (!first) {
      filter += " AND ";
    }
    first = false;
    filter += "#cat = :cat";
    attr_name["#cat"] = "category";
    attr_value[":cat"] = data.category;
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
    attr_value[":sub"] = data.subject;
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
  console.log(attr_name);
  console.log(attr_value);
  const params = {
    TableName: "Item",
    // GSI: getting filtered items by popularity
    IndexName: "popularity-index",
    //ProjectionExpression: "Subject, LastPostDateTime, Replies, Tags",
    FilterExpression: filter,
    ExpressionAttributeNames: attr_name,
    ExpressionAttributeValues: attr_value
  }

  try {
    const result = await dynamoDbLib.call("scan", params);
    // Return current user in response body
    callback(null, success(result.Items));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}