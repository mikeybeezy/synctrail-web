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
      let filderGuard = action.payload.data[0]
      let arrayLocation = []
      filderGuard && filderGuard.guard_sessions.map((data) => {
        arrayLocation = data.guard_session_location && data.guard_session_location.locations
      })
      return {
        ...state,
        allGuards: action.payload.data,
        arrayLocation: arrayLocation
      }
    }

    case userConstants.FILTER_GUARD_PROIFLE: {
      let id = action.payload
      const filderGuard = state.allGuards.find(x => x.guard_profile_id === id)
      let arrayLocation = []
      filderGuard && filderGuard.guard_sessions.map((data) => {
        arrayLocation = data.guard_session_location.locations
      })
      return {
        ...state,
        arrayLocation: arrayLocation
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
        loading: false,
        arrayLocation: arrayLocation
      }
    }

    default:
      return state
  }
}