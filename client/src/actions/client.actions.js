import { alertActions } from './';
import { userConstants } from '../constants';
import { history } from '../helpers';
import { makePOSTRequest, makeDELETERequest, makePUTRequest, makeGETRequest } from 'shared-lib/src/Axios';

export const clientActions = { 
  newClient, 
  getClientData, 
  destroyClient , 
  editClient,
  updateClient
}

export function newClient(reqparams, from) {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makePOSTRequest('/api/v1/clients', reqparams)
      .then(response => {
      	if(response.data.status === "ok"){
          const client = response.data.data
          dispatch({type: userConstants.NEW_CLIENT, payload:response});
          history.push(`/admin/clients/${client.id}/sites`);
          dispatch(alertActions.success(response.data.message));
        }else {
          dispatch({type: userConstants.CLIENT_ERROR, payload:response});
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

export function getClientData(reqparams) {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest('/api/v1/clients')
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.CLIENT_LIST, payload: response})
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

export function editClient(id) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/clients/${id}`)
      .then(response => {
        dispatch({
          type: userConstants.EDIT_CLIENT,
          payload: response
        })
      })
    }catch(e){
      dispatch( {
        type: userConstants.AUTHENTICATION_FAILURE,
        payload: console.log(e),
      })
    }
  }
}

export function updateClient(reqparams, id) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makePUTRequest(`/api/v1/clients/${id}`, reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          history.push("/admin/clients/list");
          dispatch({
            type: userConstants.UPDATE_CLIENT,
            payload: response
          })
        }else{
          dispatch({type: userConstants.CLIENT_ERROR, payload:response});
        }
      })
    }catch(e){
      dispatch( {
        type: userConstants.PROJECT_FAILURE,
        payload: console.log(e),
      })
    }
  }
}

export function destroyClient(id) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeDELETERequest(`/api/v1/clients/${id}`)
      .then(response => {
        dispatch({
          type: userConstants.DESTROY_CLIENT,
          payload: response
        })
        dispatch(alertActions.success(response.data.message));
      })
    }catch(e){
      dispatch( {
        type: userConstants.AUTHENTICATION_FAILURE,
        payload: console.log(e),
      })
    }
  }
}
