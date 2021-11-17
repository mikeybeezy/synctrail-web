import { userConstants } from '../constants';
const initialState = { loading: false, error: '' };

export function guard(state = initialState, action) {
  switch (action.type) {
    case userConstants.PAGE_LOADING: {
      return { 
        ...state, 
        loading: true 
      };
    }

    case userConstants.NEW_GUARD: {
      return {
        ...state,
        loading: false,
      }
    }

    case userConstants.GUARD_ERROR: {
      return {
        ...state,
        loading: false,
        guardError: action.payload.data
      }
    }

    case userConstants.GUARD_DATA: {
      return {
        ...state,
        loading: false,
        guardlist: action.payload.data.data,
      }
    }

    case userConstants.GUARD_DESTROY: {
      let id = action.payload.data.data.id
      return {
        ...state,
        guardlist: state.guardlist.filter(item => item.id !== id),
        loading: false,
      }
    }

    case userConstants.GUARD_EDIT: {
      return {
        ...state,
        loading: false,
        editGuard: action.payload.data.data,
        editGuarntor: action.payload.data.guard_guarantors
      }
    }

    default:
      return state
  }
}