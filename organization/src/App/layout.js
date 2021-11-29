import './assets/app.scss';
import './assets/datepicker.scss';
import React, { useEffect } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute } from '../utils-components';
import { useMediaQuery } from 'react-responsive'
import Sidebar from './components/app-layout/sidebar'
import Header from './components/app-layout/header'
import Dashboard from './components/dashboard/home';
import Login from './components/auth/login';
import ForgotPassword from './components/auth/forgotPassword';
import ResetPassword from './components/auth/resetPassword';
import ResendConfirmation from './components/auth/resendConfirmation'
import RequestUnlock from './components/auth/requestUnlock'
import Confirmation from './components/auth/confirmation'

import ClientList from './components/clients/list'
import ClientNew from './components/clients/new'
import ClientEdit from './components/clients/edit'
import ClientShow from './components/clients/show'
import SiteList from './components/sites/list'
import SiteNew from './components/sites/new'
import SiteEdit from './components/sites/edit'

import GuardList from './components/managing-guard/list'
import GuardNew from './components/managing-guard/new'
import GuardEdit from './components/managing-guard/edit'

import TourList from './components/tours/list'
import TourNew from './components/tours/new'
import TourEdit from './components/tours/edit'

import ChatHistory from './components/chat/history'
import Conversation from './components/chat/conversation'

function App() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const isUserLoggedIn = localStorage.getItem('userToken') ? true : false;
  const isMobileScreen = useMediaQuery({ query: '(max-width: 768px)' })
  const isUserRole = localStorage.getItem('userRole')

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
      { isUserRole === "admin" ? <Sidebar /> : isMobileScreen ?  <Sidebar /> : null }
      <div className={ !isUserLoggedIn ? "auth_content" : isUserRole === "admin" ? "main_content" : null} >
        <Header/>
        <div className= { isUserLoggedIn ? "main_content_inner" : null}>
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
            <PrivateRoute exact path='/admin/clients/list' component={ClientList} />
            <PrivateRoute exact path='/admin/clients/new' component={ClientNew} />
            <PrivateRoute exact path='/admin/clients/:client_id/edit' component={ClientEdit} />
            <PrivateRoute exact path='/admin/clients/:client_id/show' component={ClientShow} />
            <PrivateRoute exact path='/admin/clients/:client_id/sites' component={SiteList} />
            <PrivateRoute exact path='/admin/clients/:client_id/site/new' component={SiteNew} />
            <PrivateRoute exact path='/admin/clients/:client_id/site/:site_id/edit' component={SiteEdit} />
            <PrivateRoute exact path='/admin/guard/list' component={GuardList} />
            <PrivateRoute exact path='/admin/guard/new' component={GuardNew} />
            <PrivateRoute exact path='/admin/guard/:guard_id/edit' component={GuardEdit} />
            <PrivateRoute exact path='/admin/clients/:client_id/tours' component={TourList} />
            <PrivateRoute exact path='/admin/clients/:client_id/tours/new' component={TourNew} />
            <PrivateRoute exact path='/admin/clients/:client_id/tours/:tour_id/edit' component={TourEdit} />
            <PrivateRoute exact path='/admin/chats' component={ChatHistory} />
            <PrivateRoute exact path='/admin/chats/:conversation_id' component={Conversation} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default App;

