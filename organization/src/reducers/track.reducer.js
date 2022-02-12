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
      let filderGuard = action.payload.data[0]
      let arrayLocation = []
      arrayLocation = (filderGuard && filderGuard.guard_session_location) ? filderGuard.guard_session_location.locations : []
      return {
        ...state,
        allGuards: action.payload.data,
        arrayLocation: arrayLocation,
        centerLocation: action.payload.center_location,
        loading: false,
      }
    }

    case userConstants.FILTER_GUARD_PROIFLE: {
      let id = action.payload
      const filderGuard = state.allGuards.find(x => x.id === id)
      let arrayLocation = []
      arrayLocation = filderGuard && filderGuard.guard_session_location && filderGuard.guard_session_location.locations && filderGuard.guard_session_location.locations
      return {
        ...state,
        arrayLocation: arrayLocation,
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