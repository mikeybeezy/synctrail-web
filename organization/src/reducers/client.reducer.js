import { userConstants } from '../constants';
const initialState = { loading: false, error: '' };

export function client(state = initialState, action) {
  switch (action.type) {
    case userConstants.PAGE_LOADING: {
      return { 
        ...state, 
        loading: true 
      };
    }

    case userConstants.NEW_CLIENT: {
      return {
        ...state,
        loading: false,
      }
    }

    case userConstants.CLIENT_ERROR: {
      return {
        ...state,
        loading: false,
        clientError: action.payload.data
      }
    }

    case userConstants.CLIENT_LIST: {
      return {
        ...state,
        loading: false,
        clientList: action.payload.data.data
      }
    }

    case userConstants.DESTROY_CLIENT: {
      let id = action.payload.data.data.id
      return {
        ...state,
        clientList: state.clientList.filter(item => item.id !== id),
        loading: false,
      }
    }

    case userConstants.EDIT_CLIENT: {
      return {
        ...state,
        loading: false,
        editClient: action.payload.data.data
      }
    }
    
    default:
      return state
  }
}