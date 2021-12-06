import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { alert } from './alert.reducer';
import { user } from './user.reducer';
import { initial } from './initial.reducer';
import { client } from './client.reducer';
import { site } from './site.reducer';
import { guard } from './guard.reducer';
import { tour } from './tour.reducer';
import { chat } from './chat.reducer';
import { schedule } from './schedule.reducer';

const rootReducer = combineReducers({
  chat,
  tour,
  guard,
  site,
  client,
  alert,
  user,
  initial,
  schedule,
  form: formReducer
});

export default rootReducer;
