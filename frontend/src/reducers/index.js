import { combineReducers } from 'redux';
import fetchItem from './reducer_fetchItem';

const rootReducer = combineReducers({
  items: fetchItem
});

export default rootReducer;
