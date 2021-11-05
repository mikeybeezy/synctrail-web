import './App.scss';
import React, { useEffect } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute } from '../utils-components';
import Dashboard from './components/dashboard/home';
import Login from './components/auth/login';
import ForgotPassword from './components/auth/forgotPassword';
import ResetPassword from './components/auth/resetPassword';
import ResendConfirmation from './components/auth/resendConfirmation'
import RequestUnlock from './components/auth/requestUnlock'
import Confirmation from './components/auth/confirmation'

function App() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }, []);

   const clearAlert = () => {
    dispatch(alertActions.clear());
  }

  return (
     <Router history={history}>
      {alert.message && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
          <button type="button" className="btn-close" onClick={clearAlert}></button>
        </div>
      )}
      <Switch>
        <PrivateRoute exact path='/' component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route path='/password/new' component={ForgotPassword} />
        <Route path='/users/password/edit' component={ResetPassword} />
        <Route path='/confirmation/resend' component={ResendConfirmation} />
        <Route exact path='/admin/users/unlock/request' component={RequestUnlock} />
        <Route exact path='/users/confirmation' component={Confirmation} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}
export default App;

