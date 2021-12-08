import { alertActions } from './';
import { history } from '../helpers';
import { userConstants } from '../constants';
import { makePOSTRequest, makeGETRequest, makeDELETERequest, makePUTRequest } from 'shared-lib/src/Axios';

export const orderTemplateActions = { 
  newOrderTemplate,
  getOrderTemplate,
  destroyOrderTemplate,
  editOrderTemplate,
  updateOrderTemplate
}

export function newOrderTemplate(client_id, reqparams, closeModal) {
  return dispatch => {
    try{
      makePOSTRequest(`/api/v1/clients/${client_id}/order_templates`, reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.NEW_ORDER_TEMPLATES, payload: response})
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

export function getOrderTemplate(client_id) {
  return dispatch => {
    try{
      makeGETRequest(`/api/v1/clients/${client_id}/order_templates`)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.ORDER_TEMPLATES_DATA, payload: response})
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

export function destroyOrderTemplate(client_id, id) {
  return function (dispatch) {
    try{
      makeDELETERequest(`/api/v1/clients/${client_id}/order_templates/${id}`)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({
            type: userConstants.ORDER_TEMPLATE_DESTROY,
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


export function editOrderTemplate(client_id, id) {
  return function (dispatch) {
    try{
      makeGETRequest(`/api/v1/clients/${client_id}/order_templates/${id}`)
      .then(response => {
        dispatch({
          type: userConstants.ORDER_TEMPLATE_EDIT,
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


export function updateOrderTemplate(client_id, id, reqparams, closeModal) {
  return function (dispatch) {
    try{
      makePUTRequest(`/api/v1/clients/${client_id}/order_templates/${id}`, reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({ type: userConstants.ORDER_TEMPLATE_UPDATE, payload: response})
          closeModal()
          dispatch(alertActions.success(response.data.message));
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