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
        clientLocations: action.payload.data,
        loading: false,
      }
    }

    case userConstants.ALL_GUARDS_DETAILS: {
      return {
        ...state,
        listGuards: action.payload.data,
        allGuards: action.payload.data,
        centerLocation: action.payload.center_location,
        loading: false,
      }
    }

    case userConstants.FILTER_GUARD_PROIFLE: {
      let id = action.payload
      const singleGuard = state.listGuards.filter(x => x.id === id)
      return {
        ...state,
        allGuards: singleGuard,
        loading: false,
      }
    }

  case userConstants.GUARD_LOCATIONS: {
      let multiGuard = state.allGuards
      let singleGuard = action.payload
      let arrayLocation = []
      multiGuard.map((data, i) => {
        if(data.guard_profile_id === singleGuard.guard_id) {
          data.guard_sessions.map((gs, i) => {
            singleGuard.data.map((sg, i) => {
              const mlocation = gs.guard_session_location && gs.guard_session_location.locations
              const slocation = sg.locations 
              if(mlocation) {
                arrayLocation = [...mlocation, ...slocation]
              }else {
                arrayLocation = [...slocation]
              }
              // if(gs.guard_session_location.guard_session_id === 48) {
              // }
            }) 
          })
        }
      })
    
      return {
        ...state,
        arrayLocation: arrayLocation,
        loading: false,
      }
    }

    default:
      return state
  }
}