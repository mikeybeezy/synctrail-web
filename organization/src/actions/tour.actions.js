import { alertActions } from './';
import { userConstants } from '../constants';
import { history } from '../helpers';
import { makePOSTRequest, makeDELETERequest, makePUTRequest, makeGETRequest } from 'shared-lib/src/Axios';

export const tourActions = { 
  newTour,
  getTourData,
  editTour
}

export function newTour(reqparams) {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makePOSTRequest(`/api/v1/tours`, reqparams)
      .then(response => {
      	if(response.data.status === "ok"){
          dispatch({type: userConstants.NEW_TOUR, payload:response});
          history.push(`/admin/tours/list`);
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

export function getTourData() {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/tours`)
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

export function editClient(id) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/tours/${id}`)
      .then(response => {
        dispatch({
          type: userConstants.EDIT_TOUR,
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