import { alertActions } from './';
import { userConstants } from '../constants';
import { history } from '../helpers';
import { makePOSTRequest, makeDELETERequest, makePUTRequest, makeGETRequest } from 'shared-lib/src/Axios';

export const siteActions = { 
  newSite, 
  getSiteData,
  destroySite,
  editSite,
  updateSite,
  historyGuests,
  historyReports
}

export function newSite(reqparams, id) {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makePOSTRequest(`/api/v1/clients/${id}/sites`, reqparams)
      .then(response => {
      	if(response.data.status === "ok"){
          dispatch({type: userConstants.NEW_SITE, payload:response});
          history.push(`/admin/clients/${id}/sites`);
          dispatch(alertActions.success(response.data.message));
        }else {
          dispatch({type: userConstants.SITE_ERROR, payload:response});
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

export function getSiteData(client_id) {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/clients/${client_id}/sites`)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.SITE_LIST, payload: response})
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

export function destroySite(client_id, id) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeDELETERequest(`/api/v1/clients/${client_id}/sites/${id}`)
      .then(response => {
        dispatch({
          type: userConstants.DESTROY_SITE,
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

export function editSite(client_id, id) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/clients/${client_id}/sites/${id}`)
      .then(response => {
        dispatch({
          type: userConstants.EDIT_SITE,
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

export function updateSite(client_id, id, reqparams) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makePUTRequest(`/api/v1/clients/${client_id}/sites/${id}`, reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          history.push(`/admin/clients/${client_id}/sites`);
          dispatch({
            type: userConstants.UPDATE_SITE,
            payload: response
          })
        }else{
          dispatch({type: userConstants.SITE_ERROR, payload:response});
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

export function historyGuests(site_id) {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/guests_history/${site_id}`)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({
            type: userConstants.GUEST_HISTORY_LIST, 
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

export function historyReports(site_id) {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/reports_history/${site_id}`)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({
            type: userConstants.REPORTS_HISTORY_LIST, 
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
