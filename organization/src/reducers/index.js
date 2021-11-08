import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { user } from './user.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  user,
  alert,
  form: formReducer
});

export default rootReducer;
