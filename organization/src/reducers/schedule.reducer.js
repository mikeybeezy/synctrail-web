import { userConstants } from '../constants';
const initialState = { loading: false, error: '' };

export function schedule(state = initialState, action) {
  switch (action.type) {
    case userConstants.PAGE_LOADING: {
      return { 
        ...state, 
        loading: false 
      };
    }

    case userConstants.SCHEDULE_INITIAL_DATA: {
      return {
        ...state,
        loading: false,
        guardSchedule: action.payload.data
      }
    }

    case userConstants.GUARD_SCHEDULE_LIST: {
      return {
        ...state,
        loading: false,
        scheduleList: action.payload.data.data
      }
    }

    case userConstants.GET_SITES: {
      return {
        ...state,
        clientData: action.payload.data
      }
    }

    case userConstants.EDIT_SCHEDULE: {
      return {
        ...state,
        editSchedule: action.payload.data.data
      }
    }

    case userConstants.DESTROY_SCHEDULE: {
      let id = action.payload.data.data.id
      return {
        ...state,
        scheduleList: state.scheduleList.filter(item => item.id !== id),
      }
    }
  
    default:
      return state
  }
}