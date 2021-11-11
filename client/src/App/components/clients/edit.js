import React, { useEffect } from 'react';
import { connect,  useDispatch } from 'react-redux';
import { clientActions } from '../../../actions';
import { Link, useParams } from 'react-router-dom';
import ClientForm from "../clients/form";

function ClientNew(props) {
  const dispatch = useDispatch();
  const { client_id } = useParams();
  const { editClient } = props

  useEffect(() => {
    dispatch(clientActions.editClient(client_id));
  }, []);

  const showResults = (values) => {
    dispatch(clientActions.updateClient(values, client_id));
  }

  if (props.loading) {
    return <div className="page_loading">Loading..</div>
  }

  return (
    <div className="container">
      <ClientForm onSubmit={showResults}
        newForm="editForm"
        editClient={editClient && editClient}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.client.loading,
    editClient: state.client.editClient
  }
};

export default connect(mapStateToProps,{ clientActions })(ClientNew);
