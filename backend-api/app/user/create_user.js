import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";
/**
 * @api {post} /user/create Save user information to database.
 * @apiName createUser
 * @apiGroup User
 * 
 * @apiParam {String} email Purdue email of the user.
 * @apiParam {String} username 
 * 
 * @apiSuccess {Object} "" a JSON object of user info.
 * @apiSuccess {JSON} status false
 */
export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  if (!event.requestContext.identity.cognitoIdentityId || !data.email ){//|| !data.username) {
    callback(null, failure({ 
      status: false, 
      message: "missing required parameters"
    }));
    return;
  }
  const params = {
    TableName: "User",
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      email: data.email,
      username: data.username
      //pass: data.pass
      //createdAt: new Date().getTime()
    }

  };
  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false }));
  }

}
