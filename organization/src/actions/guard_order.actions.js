import { alertActions } from './';
import { history } from '../helpers';
import { userConstants } from '../constants';
import { makePOSTRequest, makeGETRequest, makeDELETERequest, makePUTRequest } from 'shared-lib/src/Axios';

export const guardOrderActions = { 
  getOrderTemplate,
  getOrders,
  newOrders,
  destroyGuardOrder,
  updateGuardOrder
}

export function getOrderTemplate(schedule_id) {
  return dispatch => {
    try{
      makeGETRequest(`/api/v1/guards_schedule/${schedule_id}/order_template`)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.GET_ORDER_TEMPLATES_DATA, payload: response})
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

export function getOrders(schedule_id) {
  return dispatch => {
    try{
      makeGETRequest(`/api/v1/guards_schedule/${schedule_id}/guard_orders`)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.GET_ORDERS, payload: response})
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


export function newOrders(schedule_id, reqparams) {
  return dispatch => {
    try{
      makePOSTRequest(`/api/v1/guards_schedule/${schedule_id}/guard_orders`, reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.NEW_ORDER, payload: response});
          history.push(`/admin/guard/schedule/${schedule_id}/orders`);
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


export function destroyGuardOrder(schedule_id, id) {
  return function (dispatch) {
    try{
      makeDELETERequest(`/api/v1/guards_schedule/${schedule_id}/guard_orders/${id}`)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({
            type: userConstants.ORDER_DESTROY,
            payload: response
          })
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

export function updateGuardOrder(schedule_id, id, reqparams, handleClose ) {
  return function (dispatch) {
    try{
      makePUTRequest(`/api/v1/guards_schedule/${schedule_id}/guard_orders/${id}`, reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.UPDATE_ORDER, payload: response})
          dispatch(alertActions.success(response.data.message));
          handleClose()
        }else{
          dispatch(alertActions.error(response.data.error));
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