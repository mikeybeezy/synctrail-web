import { alertActions } from './';
import { userConstants } from '../constants';
import { history } from '../helpers';
import { makePOSTRequest, makePUTRequest, makeGETRequest } from 'shared-lib/src/Axios';

export const userActions = {
  userLogin,
  logout,
  newPassword,
  resetPassword,
  resendConfirmation,
  requestUnlock,
  confirm
};

export function userLogin(reqparams, from) {
  return dispatch => {
    try{
      makePOSTRequest('/api/v1/auth', reqparams)
      .then(response => {
      	if(response.data.status === "ok"){
          dispatch({type: userConstants.LOGIN_USER, payload:response});
          localStorage.setItem('userToken', JSON.stringify(response.data.token));
          localStorage.setItem('organiToken', response.data.org_id);
          localStorage.setItem('userRole', response.data.user_role);
          console.log(response.data.org_id)
          console.log(response.data.org_id)
          console.log(response.data.org_id)
          console.log(response.data.org_id)
          history.push("/");
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

export function logout() {
  return function (dispatch) {
    const user = localStorage.removeItem('userToken');
    if(!user){
      try{
        history.push("/login");
      }catch(e){
        dispatch( {
          type: userConstants.AUTHENTICATION_FAILURE,
          payload: console.log(e),
        })
      }
    }
  }
}

export function newPassword(reqparams) {
  return dispatch => {
    try{
      makePOSTRequest('/api/v1/user/password/new', reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.NEW_PASSWORD, payload: response})
          history.push('/login');
        }else {
          dispatch(alertActions.error(response.data.error));
          dispatch({type: userConstants.NEW_PASSWORD_FAILURE, payload: response.error})
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

export function resetPassword(reqparams) {
  return dispatch => {
    try{
      makePUTRequest('/api/v1/user/password/update', reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.RESET_PASSWORD, payload: response})
          history.push('/login');
          dispatch(alertActions.success(response.data.message));
        }else {
          dispatch(alertActions.error(response.data.error));
          dispatch({type: userConstants.RESET_PASSWORD_FAILURE, payload: response.error})
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

export function resendConfirmation(reqparams) {
  return dispatch => {
    try{
      makePOSTRequest('/api/v1/users/resend_confirmation', reqparams)
      .then(response => {
        if(response.data.error){
          dispatch(alertActions.error(response.data.message));
        }else {
          dispatch(alertActions.success(response.data.message));
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

export function requestUnlock(reqparams) {
  return dispatch => {
    try{
      makePOSTRequest('/api/v1/users/request_unlock', reqparams)
      .then(response => {
        if(response.data.error){
          dispatch(alertActions.error(response.data.message));
        }else {
          dispatch(alertActions.success(response.data.message));
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


export function confirm(reqparams) {
  return dispatch => {
    try{
      makeGETRequest('/users/confirmation?confirmation_token='+ reqparams)
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.CONFIRM_SUCCESS, payload: response})
          history.push('/');
          dispatch(alertActions.success(userConstants.CONFIRM_SUCCESS));
        }else {
          history.push('/');
          dispatch(alertActions.error(response.data.error));
          dispatch({type: userConstants.CONFIRM_FAILURE, payload: response.error})
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