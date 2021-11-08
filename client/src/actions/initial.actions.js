import { alertActions } from './';
import { userConstants } from '../constants';
import { makeGETRequest } from 'shared-lib/src/Axios';

export const initialActions = { initialData };

export function initialData(reqparams) {
  return dispatch => {
    try{
      makeGETRequest('/api/v1/get_initialData')
      .then(response => {
        if(response.data.status === "ok"){
          dispatch({type: userConstants.INITIAL_DATA, payload: response.data})
        }else {
          dispatch({type: userConstants.INITIAL_DATA_ERROR, payload: response.error})
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