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
    <main className="d-flex align-items-center text-center">
      <div  className="container">
        <h1> Dashboard </h1>
        <Button variant="primary" size="lg" onClick={logout}>Logout</Button>
      </div>
    </main>
  );
}

export default Dashboard