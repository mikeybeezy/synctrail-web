import React from 'react';
import { connect,  useDispatch } from 'react-redux';
import { siteActions } from '../../../actions';
import { useParams } from 'react-router-dom';
import SiteForm from "../sites/form";

function SiteNew(props) {
  const dispatch = useDispatch();
  const { siteError } = props
  const { client_id } = useParams();
  const showResults = (values) => {
    dispatch(siteActions.newSite(values, client_id));
  }
  return (
    <div className="container">
      {siteError && siteError.error.map((error, index) => {
        return (
          <div key={index}>{error}</div>
        )
      })}
      <SiteForm onSubmit={showResults} newForm="newForm" client_id={client_id}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.site.loading,
    siteError: state.site.siteError
  }
};

export default connect(mapStateToProps,{ siteActions })(SiteNew);
