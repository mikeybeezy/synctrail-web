import { alertActions } from './';
import { userConstants } from '../constants';
import { makePOSTRequest, makeGETRequest, makePUTRequest, makeDELETERequest } from 'shared-lib/src/Axios';

export const organizationActions = { 
  newOrganization, 
  getOrganization, 
  editOrganization, 
  destroyOrganization,
  updateOrganization
}

export function newOrganization(reqparams, closeModal) {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makePOSTRequest('/api/v1/organizations', reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.NEW_ORGANIZATION, payload: response})
          closeModal()
          dispatch(alertActions.success(response.data.message));
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

export function getOrganization() {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest('/api/v1/organizations')
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.GET_ORGANIZATION, payload: response})
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

export function editOrganization(id) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/organizations/${id}`)
      .then(response => {
        dispatch({
          type: userConstants.EDIT_ORGANIZATION,
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

export function updateOrganization(id, reqparams, closeModal) {
  console.log(id)
  console.log(reqparams)
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makePUTRequest(`/api/v1/organizations/${id}`, reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({
            type: userConstants.UPDATE_ORGANIZATION,
            payload: response
          })
          closeModal()
          dispatch(alertActions.success(response.data.message));
        }else{
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

export function destroyOrganization(id) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeDELETERequest(`/api/v1/organizations/${id}`)
      .then(response => {
        dispatch({
          type: userConstants.DESTROY_ORGANIZATION,
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
