import { alertActions } from './';
import { userConstants } from '../constants';
import { history } from '../helpers';
import { makePOSTRequest } from '../utils/Axios';

export const userActions = {
  userLogin,
};

export function userLogin(reqparams) {
  return dispatch => {
    try{
      makePOSTRequest('/api/v1/auth', reqparams)
      .then(response => {
      	if(response.data.status === "ok"){
          dispatch({type: userConstants.LOGIN_USER, payload: response});
        }else {
          dispatch(alertActions.error(response.data.message));
        }
      })
    }catch{

    }
  }
}

