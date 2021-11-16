import React, {useState, useEffect} from 'react';
import { connect,  useDispatch } from 'react-redux';
import { guardManagementActions } from '../../../actions';
import { useParams } from 'react-router-dom';
import { buildFormDataFromObject } from '../../../utils/commonUtils';
import NewGuardForm from "../managing-guard/form";

function SiteNew(props) {
  const [guarntorlist, setGuarntorList] = useState([]);
  const dispatch = useDispatch();
  const { guardError } = props
  const { guard_id } = useParams();

  useEffect(() => {
    dispatch(guardManagementActions.editGuard(guard_id));
  }, []);

  const handleGuard = (values) => { setGuarntorList(values)}

  const showResults = (values) => {
    const objectValues = {guard_profile: values, guard_guarantor: guarntorlist}
    let formData = new FormData();
    buildFormDataFromObject(formData, objectValues);
    dispatch(guardManagementActions.updateGuard(formData, guard_id));
  }

  if (props.loading) {
    return <div className="page_loading">Loading..</div>
  }

  return (
    <div className="container">
      {guardError && guardError.error.map((error, index) => {
        return (
          <div key={index}>{error}</div>
        )
      })}
      <NewGuardForm 
        onSubmit={showResults} 
        formStatus="editForm" 
        onSelectGuarntor={handleGuard}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.guard.loading,
    guardError: state.guard.guardError
  }
};


export default connect(mapStateToProps,{ guardManagementActions })(SiteNew);
