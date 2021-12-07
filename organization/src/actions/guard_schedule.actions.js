import { alertActions } from './';
import { userConstants } from '../constants';
import { history } from '../helpers';
import { makePOSTRequest, makeDELETERequest, makePUTRequest, makeGETRequest } from 'shared-lib/src/Axios';

export const scheduleActions = { 
  getScheduleData, 
  getSites, 
  createGuardSchedule, 
  scheduleInitialData, 
  destroySchedule,
  scheduleEdit,
  updateGuardSchedule
}

export function getScheduleData() {
  return dispatch => {
    try{
      makeGETRequest('/api/v1/guards_schedule')
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.GUARD_SCHEDULE_LIST, payload: response})
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

export function scheduleInitialData() {
  return dispatch => {
    try{
      makeGETRequest('/api/v1/initial_schedule')
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.SCHEDULE_INITIAL_DATA, payload: response})
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

export function getSites(client_id) {
  return dispatch => {
    try{
      makePOSTRequest(`/api/v1/guards_schedule/sites/${client_id}`)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.GET_SITES, payload:response});
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

export function createGuardSchedule(reqparams) {
  return dispatch => {
    try{
      makePOSTRequest(`/api/v1/guards_schedule`, reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.NEW_GUARD_SCHEDULE, payload:response});
          history.push(`/admin/guard/schedule/list`);
          dispatch(alertActions.success(response.data.message));
        }else {
          dispatch(alertActions.success(response.data.error));
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


export function destroySchedule(id) {
  return function (dispatch) {
    try{
      makeDELETERequest(`/api/v1/guards_schedule/${id}`)
      .then(response => {
        dispatch({
          type: userConstants.DESTROY_SCHEDULE,
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

export function scheduleEdit(id) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/guards_schedule/${id}`)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({ type: userConstants.EDIT_SCHEDULE,payload: response})
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

export function updateGuardSchedule(id, reqparams) {
  return function (dispatch) {
    try{
      makePUTRequest(`/api/v1/guards_schedule/${id}`, reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          history.push(`/admin/guard/schedule/list`);
          dispatch({
            type: userConstants.UPDATE_SCHEDULE,
            payload: response
          })
          dispatch(alertActions.success(response.data.message));
        }else{
          dispatch({type: userConstants.SCHEDULE_ERROR, payload:response});
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
