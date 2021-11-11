import { userConstants } from '../constants';

let userToken = JSON.parse(localStorage.getItem('userToken'));
const initialState = userToken ? { loggedIn: true, userToken } : {};

export function user(state = initialState, action) {
  switch (action.type) {
    case userConstants.USER_LOGIN:
       return { loggingIn: true, user: action.payload.data };
     case userConstants.LOGOUT_USER: {
     	return{loggingIn: false}
     }
    default:
      return state
  }
}

