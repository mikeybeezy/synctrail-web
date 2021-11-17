import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { alert } from './alert.reducer';
import { user } from './user.reducer';
import { initial } from './initial.reducer';

const rootReducer = combineReducers({
  alert,
  user,
  initial,
  form: formReducer
});

export default rootReducer;
