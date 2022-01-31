import { userConstants } from '../constants';
const initialState = { loading: false, error: '' };

export function track(state = initialState, action) {
  switch (action.type) {
    case userConstants.PAGE_LOADING: {
      return { 
        ...state, 
        loading: true 
      };
    }

    case userConstants.CLIENT_LIST: {
      return {
        ...state,
        clientList: action.payload.data,
        loading: false,
      }
    }

    case userConstants.CLIENT_LOCATIONS: {
      return {
        ...state,
        clientLocations: action.payload.data
      }
    }

    case userConstants.ALL_GUARDS_DETAILS: {
      return {
        ...state,
        allGuards: action.payload.data
      }
    }

    case userConstants.GUARD_LOCATIONS: {
      return {
        ...state,
        loading: false,
        guardLocation: action.payload.data
      }
    }


    default:
      return state
  }
}