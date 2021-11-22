import { userConstants } from '../constants';
const initialState = { loading: false, error: '' };

export function organization(state = initialState, action) {
  switch (action.type) {
    case userConstants.PAGE_LOADING: {
      return { 
        ...state, 
        loading: true 
      };
    }

    case userConstants.GET_ORGANIZATION: {
      return {
        ...state,
        organizationList: action.payload.data.data,
        loading: false
      }
    }

    case userConstants.NEW_ORGANIZATION: {
      let currentOrganization = action.payload.data.data
      const organizationList = [...state.organizationList,  currentOrganization]
      return {
        ...state,
        organizationList: organizationList,
        loading: false,
      }
    }

    case userConstants.EDIT_ORGANIZATION: {
      return {
        ...state,
        editOrganization: action.payload.data.data,
        loading: false
      }
    }

   case userConstants.UPDATE_ORGANIZATION: {
      let org = action.payload.data.data
      let updateArray = state.organizationList.map((el, i) => (
        el.id === org.id ? {...el, business_name: org.business_name, display_name: org.display_name, platform_notes: org.platform_notes}: el
      ))

      return {
        ...state,
        organizationList: updateArray,
        loading: false
      }
    }

    case userConstants.DESTROY_ORGANIZATION: {
      let id = action.payload.data.data.id
      return {
        ...state,
        organizationList: state.organizationList.filter(item => item.id !== id),
        loading: false,
      }
    }
  
    default:
      return state
  }
}