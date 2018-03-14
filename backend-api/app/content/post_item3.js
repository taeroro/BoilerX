import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  if (!data.name || !data.price || !data.sellerName) {
    callback(null, failure({ 
      status: false, 
      message: "missing required parameters"
    }));
    return;
  }
  
  const params = {
    TableName: "Item",
    Item: {
      sellerID: event.requestContext.identity.cognitoIdentityId,
      itemID: uuid.v1(),
      name: data.name,
      searchName: String(data.name).toLowerCase(),
      popularity: 0,
      category: data.category ? String(data.category).toLowerCase() : null,
      subject: data.subject ? String(data.subject).toLowerCase() : null,
      sellerName: data.sellerName,
      price: Number(data.price),
      crn: data.crn? Number(data.crn): null,
      // may set default in S3
      imageURL: data.imageURL ? data.imageURL : null,
      descr: data.descr? data.descr : null,
      createdAt: new Date().getTime(),
      tags: data.tags? data.tags : null
    }
    
  };
  try {
    const result = await dynamoDbLib.call("put", params);
    console.log("success");
    callback(null, success(params.Item));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}