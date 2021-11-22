import { alertActions } from './';
import { userConstants } from '../constants';
import { history } from '../helpers';
import { makePOSTRequest, makeDELETERequest, makePUTRequest, makeGETRequest } from 'shared-lib/src/Axios';

export const tourActions = { 
  newTour,
  getTourData,
  editTour,
  updateTour
}

export function newTour(reqparams, clientId) {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makePOSTRequest(`/api/v1/clients/${clientId}/tours`, reqparams)
      .then(response => {
      	if(response.data.status === "ok"){
          dispatch({type: userConstants.NEW_TOUR, payload:response});
          history.push(`/admin/clients/${clientId}/tours`);
          dispatch(alertActions.success(response.data.message));
        }else {
          dispatch(alertActions.error(response.data.message));
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

export function getTourData(client_id) {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/clients/${client_id}/tours`)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.TOUR_DATA, payload:response});
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


export function editTour(client_id, tour_id) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/clients/${client_id}/tours/${tour_id}`)
      .then(response => {
        dispatch({
          type: userConstants.TOUR_EDIT,
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


export function updateTour(reqparams, clientId, tourId, ) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makePUTRequest(`/api/v1/clients/${clientId}/tours/${tourId}`, reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          history.push(`/admin/clients/${clientId}/tours`);
          dispatch({
            type: userConstants.TOUR_UPDATE,
            payload: response
          })
          dispatch(alertActions.success(response.data.message));
        }else{
          dispatch(alertActions.error(response.data.message));
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