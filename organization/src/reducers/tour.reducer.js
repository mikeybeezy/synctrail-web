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
        tourData: action.payload.data.data,
        currentlocation: action.payload.data.location
      }
    }

    case userConstants.TOUR_EDIT: {
      return {
        ...state,
        loading: false,
        currentTourData: action.payload.data.data,
        tourStop: action.payload.data.tour_stops,
        currentlocation: action.payload.data.location
      }
    }


    case userConstants.TOUR_DESTROY: {
      let id = action.payload.data.data.id
      return {
        ...state,
        tourData: state.tourData.filter(item => item.id !== id),
        loading: false,
      }
    }

    default:
      return state
  }
}