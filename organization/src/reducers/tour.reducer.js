import { userConstants } from '../constants';
const initialState = { loading: false, error: '' };

export function tour(state = initialState, action) {
  switch (action.type) {
    case userConstants.PAGE_LOADING: {
      return { 
        ...state, 
        loading: true 
      };
    }

    case userConstants.NEW_TOUR: {
      return {
        ...state,
        loading: false,
      }
    }

    case userConstants.TOUR_DATA: {
      return {
        ...state,
        loading: false,
        tourData: action.payload.data.data
      }
    }

    default:
      return state
  }
}