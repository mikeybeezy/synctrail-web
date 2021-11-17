import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { initialActions, userActions} from '../../../actions';
import { Button } from 'react-bootstrap';


function Dashboard(props) {
	const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialActions.initialData());
  }, []);

  function logout(response) {
    dispatch(userActions.logout());
  }

  if (props.loading) {
    return <div className="page_loading">Loading..</div>
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

const mapStateToProps = (state) => {
  return {
    loading: state.initial.loading,
  };
};

export default connect(mapStateToProps, {initialActions, userActions  })(Dashboard);
