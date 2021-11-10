import React, { useEffect } from 'react';
import { connect,  useDispatch } from 'react-redux';
import { siteActions } from '../../../actions';
import { useParams } from 'react-router-dom';
import SiteForm from "../sites/form";

function ClientNew(props) {
  const dispatch = useDispatch();
  const { client_id, site_id } = useParams();
  
  useEffect(() => {
    dispatch(siteActions.editSite(client_id, site_id));
  }, []);

  const showResults = (values) => {
    dispatch(siteActions.updateSite(client_id, site_id, values));
  }

  if (props.loading) {
    return <div className="page_loading">Loading..</div>
  }

  return (
    <div className="container">
      <SiteForm onSubmit={showResults}
        newForm="editForm"
        client_id={client_id}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.site.loading,
  }
};

export default connect(mapStateToProps,{ siteActions })(ClientNew);
