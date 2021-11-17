import { alertActions } from './';
import { history } from '../helpers';
import { userConstants } from '../constants';
import { makeFormDataPOSTRequest, makeGETRequest, makeDELETERequest, makeFormDataPUTRequest } from 'shared-lib/src/Axios';

export const guardManagementActions = { 
  newGuard, 
  getGuardData, 
  destroyGuard,
  editGuard,
  updateGuard
};

export function newGuard(reqparams, guarndor_form) {
  return dispatch => {
    try{
      makeFormDataPOSTRequest('/api/v1/gurds_management', reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.NEW_GUARD, payload:response});
          history.push(`/admin/guard/list`);
          dispatch(alertActions.success(response.data.message));
        }else {
          dispatch({type: userConstants.GUARD_ERROR, payload:response});
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

export function getGuardData() {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest('/api/v1/gurds_management')
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.GUARD_DATA, payload: response})
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

export function editGuard(id) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/gurds_management/${id}`)
      .then(response => {
        dispatch({
          type: userConstants.GUARD_EDIT,
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

export function updateGuard(reqparams, id) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeFormDataPUTRequest(`/api/v1/gurds_management/${id}`, reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({
            type: userConstants.GUARD_UPDATE,
            payload: response
          })
          history.push(`/admin/guard/list`);
          dispatch(alertActions.success(response.data.message));
        }else{
          dispatch({type: userConstants.GUARD_ERROR, payload:response});
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


export function destroyGuard(id) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeDELETERequest(`/api/v1/gurds_management/${id}`)
      .then(response => {
        dispatch({
          type: userConstants.GUARD_DESTROY,
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
