import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../actions';
import { history } from '../../../helpers';

function ConfirmPage(props) {

  const dispatch = useDispatch();
  const query = new URLSearchParams(props.location.search);
  const token = query.get('confirmation_token');

  useEffect(() => {
    dispatch(userActions.confirm(token));
  }, []);

  return (
    <main className="d-flex align-items-center justify-content-center">

    </main>
  );
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, { userActions })(ConfirmPage);
