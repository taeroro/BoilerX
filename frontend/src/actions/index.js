import axios from 'axios';

// TODO: database url
const ROOT_URL = "";

export const FETCH_ITEM = 'FETCH_ITEM';

export function fetchItem(itemName) {
  // TODO: modify url based on root.
  const url = ROOT_URL;
  const request = axios.get(url);

  return {
    type: FETCH_ITEM,
    payload: request
  };
}
