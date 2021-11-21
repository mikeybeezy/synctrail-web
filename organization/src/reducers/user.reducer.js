import { userConstants } from '../constants';
const initialState = { loading: false, error: '' };

export function user(state = initialState, action) {
  switch (action.type) {
    case userConstants.PAGE_LOADING: {
      return { 
        ...state, 
        loading: true 
      };
    }

    case userConstants.LOGIN_USER: {
      return {
        ...state,
        loginUser: action.payload.data,
        loading: false
      }
    }
    
    case userConstants.LOGOUT_USER: {
      return{
        loggingIn: false
      }
    }

    default:
      return state
  }
}