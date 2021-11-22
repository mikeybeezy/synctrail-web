import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { initialActions } from '../../../actions';
import { Button } from 'react-bootstrap';


function Dashboard(props) {
	const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialActions.initialData());
  }, []);

  if (props.loading) {
    return <div className="page_loading">Loading..</div>
  }

  return (
   <div  className="container">
    <div className="page_header">
      <h3> Dashboard </h3>
    </div>
  </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.initial.loading,
  };
};

export default connect(mapStateToProps, { initialActions })(Dashboard);
