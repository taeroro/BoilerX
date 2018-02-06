import { FETCH_ITEM } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_ITEM:
      // TODO: return the items 
      return state;
  }

  return state;
}
