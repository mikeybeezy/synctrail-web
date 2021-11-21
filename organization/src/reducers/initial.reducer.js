import { userConstants } from '../constants';
const initialState = { loading: false, error: '' };

export function initial(state = initialState, action) {
  switch (action.type) {
    case userConstants.PAGE_LOADING: {
      return { 
        ...state, 
        loading: true 
      };
    }

    case userConstants.INITIAL_DATA: {
      return {
        ...state,
        currentUser: action.payload.data.data,
        guardSalary: action.payload.data.guard_salary,
        organizations: action.payload.data.organizations,
        loading: false,
      }
    }

  
    default:
      return state
  }
}