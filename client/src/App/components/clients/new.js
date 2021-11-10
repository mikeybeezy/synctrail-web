import React from 'react';
import { connect,  useDispatch } from 'react-redux';
import { clientActions } from '../../../actions';
import ClientForm from "../clients/form";

function ClientNew(props) {
  const { clientError } = props
  const dispatch = useDispatch();
  const showResults = (values) => {
    dispatch(clientActions.newClient(values));
  }
  return (
    <div className="container">
       {clientError && clientError.error.map((error, index) => {
          return (
            <div key={index}>{error}</div>
          )
       })}
      <ClientForm onSubmit={showResults} newForm="newForm"/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.client.loading,
    clientError: state.client.clientError
  }
};

export default connect(mapStateToProps,{ clientActions })(ClientNew);
