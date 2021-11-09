import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { alert } from './alert.reducer';
import { user } from './user.reducer';
import { initial } from './initial.reducer';
import { client } from './client.reducer';
import { site } from './site.reducer';

const rootReducer = combineReducers({
  site,
  client,
  alert,
  user,
  initial,
  form: formReducer
});

export default rootReducer;
