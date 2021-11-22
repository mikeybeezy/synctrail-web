import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { userActions } from '../../../actions';

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
