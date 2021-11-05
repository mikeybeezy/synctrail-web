import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect } from 'react';
import { Router, Switch, Route, Redirect} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute } from '../components';
import Dashboard from './screens/dashboard/home';
import Login from './screens/auth/login';

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
        <div
          className={`alert ${alert.type}`}
        >
          {alert.message}
          <button type="button" className="btn-close" onClick={clearAlert}></button>
        </div>
      )}
      <Switch>
        <PrivateRoute exact path='/' component={Dashboard} />
        <Route path='/login' component={Login} />
      </Switch>
    </Router>
  );
}
export { App };
