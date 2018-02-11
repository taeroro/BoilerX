import axios from 'axios';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";
import Pormise from 'redux-promise';

/* non-packages */
import config from "../config";

// TODO: database url
const ROOT_URL = "";
export const FETCH_ITEM = 'FETCH_ITEM';
export const LOGIN = 'LOGIN';


export function fetchItem(itemName) {
  // TODO: modify url based on root.
  const url = ROOT_URL;
  const request = axios.get(url);

  return {
    type: FETCH_ITEM,
    payload: request
  };
}

export function login(values, callback) {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID
  });
  const user = new CognitoUser({ Username: values.emailAddress, Pool: userPool });
  const authenticationData = { Username: values.emailAddress, Password: values.password };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  return {
    type: LOGIN,
    payload: new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(),
        onFailure: err => reject(err)
      })
    ).then(() => callback())
  }
}
