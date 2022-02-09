import { alertActions } from './';
import { userConstants } from '../constants';
import { history } from '../helpers';
import { 
  makePOSTRequest, 
  makeDELETERequest, 
  makePUTRequest, 
  makeGETRequest 
} from 'shared-lib/src/Axios';

export const trackActions = { 
  getAllClients,
  getClientLocation,
  getGuards
}

export function getAllClients() {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/all_clients`)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({
            type: userConstants.CLIENT_LIST, 
            payload: response.data
          })
        }else {
          dispatch(alertActions.error(response.data.error));
        }
      })
    }catch(e){
      dispatch( {
        type: userConstants.AUTHENTICATION_FAILURE,
        payload: console.log(e),
      })
    }
  }
}

export function getClientLocation(id) {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/client_locations/${id}`)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({
            type: userConstants.CLIENT_LOCATIONS,
            payload: response.data
          })
        }else {
          dispatch(alertActions.error(response.data.error));
        }
      })
    }catch(e){
      dispatch( {
        type: userConstants.AUTHENTICATION_FAILURE,
        payload: console.log(e),
      })
    }
  }
}

export function getGuards(id, activeMap) {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/all_guards_details/${id}`)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({
            type: userConstants.ALL_GUARDS_DETAILS,
            payload: response.data
          })
          activeMap()
        }else {
          dispatch(alertActions.error(response.data.error));
        }
      })
    }catch(e){
      dispatch( {
        type: userConstants.AUTHENTICATION_FAILURE,
        payload: console.log(e),
      })
    }
  }
}