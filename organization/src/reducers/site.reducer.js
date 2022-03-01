import { userConstants } from '../constants';
const initialState = { loading: false, error: '' };

export function site(state = initialState, action) {
  switch (action.type) {
    case userConstants.PAGE_LOADING: {
      return { 
        ...state, 
        loading: true 
      };
    }

    case userConstants.NEW_SITE: {
      return {
        ...state,
        loading: false,
      }
    }

    case userConstants.SITE_ERROR: {
      return {
        ...state,
        loading: false,
        siteError: action.payload.data
      }
    }

    case userConstants.SITE_LIST: {
      return {
        ...state,
        loading: false,
        siteList: action.payload.data.data
      }
    }

    case userConstants.DESTROY_SITE: {
      let id = action.payload.data.data.id
      return {
        ...state,
        siteList: state.siteList.filter(item => item.id !== id),
        loading: false,
      }
    }

    case userConstants.EDIT_SITE: {
      return {
        ...state,
        loading: false,
        editSite: action.payload.data.data
      }
    }

    case userConstants.GUEST_HISTORY_LIST: {
      return {
        ...state,
        loading: false,
        guestes: action.payload.data
      }
    }

    case userConstants.REPORTS_HISTORY_LIST: {
      return {
        ...state,
        loading: false,
        reports: action.payload.data
      }
    }

    default:
      return state
  }
}