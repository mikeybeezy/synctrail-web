import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  alert,
  form: formReducer
});

export default rootReducer;
