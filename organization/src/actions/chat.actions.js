import { alertActions } from './';
import { history } from '../helpers';
import { userConstants } from '../constants';
import { makeFormDataPOSTRequest, makeGETRequest, makePOSTRequest } from 'shared-lib/src/Axios';

export const chatActions = { 
  getChatUsers,
  createConversation,
  getChatMessages,
  senderMessage,
};


export function getChatUsers() {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/messages`)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.GET_CHAT_USERS, payload:response});
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

export function createConversation(reqparams) {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makePOSTRequest(`/api/v1/new_conversaton`, reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.CREATE_CONVERSATION, payload: response});
          const { conversation } = response.data
          history.push(`/admin/chats/${conversation.id}`);
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

export function getChatMessages(conversation_id) {
  return function (dispatch) {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeGETRequest(`/api/v1/get_messages/${conversation_id}`)
      .then(response => {
        dispatch({
          type: userConstants.GET_CHAT_MESSAGES,
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


export function senderMessage(reqparams, conversation_id) {
  return dispatch => {
    try{
      dispatch({ type: userConstants.PAGE_LOADING });
      makeFormDataPOSTRequest(`/api/v1/create_message/${conversation_id}`, reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.SENDER_MESSAGE, payload:response});
          dispatch(alertActions.success(response.data.message));
        }else {
          dispatch({type: userConstants.SENDER_ERROR, payload:response});
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


