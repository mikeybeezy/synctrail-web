import React, {useState} from 'react';
import { connect,  useDispatch } from 'react-redux';
import { guardManagementActions } from '../../../actions';
import { buildFormDataFromObject } from '../../../utils/commonUtils';
import NewGuardForm from "../managing-guard/form";

function SiteNew(props) {
  const { guardError } = props
  const [guarntorlist, setGuarntorList] = useState([]);
  const dispatch = useDispatch();
  
  const handleGuard = (values) => { setGuarntorList(values)}

  const showResults = (values) => {
    const objectValues = {guard_profile: values, guard_guarantor: guarntorlist}
    let formData = new FormData();
    buildFormDataFromObject(formData, objectValues);
    dispatch(guardManagementActions.newGuard(formData));
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
        formStatus="newForm" 
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
