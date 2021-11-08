import React from 'react';
import { useDispatch } from 'react-redux';
import { userActions} from '../../../actions';
import { Button } from 'react-bootstrap';

function Dashboard(props) {
	const dispatch = useDispatch();

  function logout(response) {
    dispatch(userActions.logout());
  }

  return (
   <div  className="container">
    <div className="page_header">
      <h3> Dashboard </h3>
    </div>
    <Button variant="primary" onClick={logout}>Logout</Button>
  </div>
  );
}

export default Dashboard