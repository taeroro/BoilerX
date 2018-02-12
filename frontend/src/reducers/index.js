import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import fetchItem from './reducer_fetchItem';

const rootReducer = combineReducers({
  items: fetchItem,
  form: formReducer
});

export default rootReducer;
