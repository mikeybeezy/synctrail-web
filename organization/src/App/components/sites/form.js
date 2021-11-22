import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { textInput } from 'shared-lib/src/form-elements';
import { siteValidation } from 'shared-lib/src/validation';
import { reduxForm, Field } from "redux-form";
import GoogleMap from '../../../images/google-map.png'

function LocationForm(props) {
  const { handleSubmit, initialize, formStatus , client_id} = props
  useEffect(() => {
    if(formStatus === "newForm") {
      initialize({ LocationForm: "" })
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="py-2">Add Site</h5>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <Field name="name" type="text" component={textInput} label="Site Name" placeholder="Site name..."/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <Field name="code" type="number" component={textInput} label="Site Number" placeholder="Site number..."/>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <Field name="address_line_1" type="text" component={textInput} label="Address Line 1" placeholder="Address..."/>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <Field name="address_line_2" type="text" component={textInput} label="Address Line 2" placeholder="Address..."/>
          </div>
        </div>
      </div>
      <h5 className="py-3">Contact Person</h5>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <Field name="contact_person_full_name" type="text" component={textInput} label="Name" placeholder="Name..."/>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <Field name="contact_person_phone_number" type="number" component={textInput} label="Phone" placeholder="Phone..."/>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <Field name="contact_person_email" type="email" component={textInput} label="Email" placeholder="Email..."/>
          </div>
        </div>
        <div className="google-map">
          <label>Create Geo Fence</label>
          <img src={GoogleMap} alt="google-map"/>
        </div>
      </div>
      <div className="mb-3 mt-4 form-footer">
        <Button variant="primary" type="submit">{formStatus === "newForm" ? "Save" : "Update"}</Button>
        <Link to={`/admin/clients/${client_id}/sites`} className="px-3">
          <Button variant="default">Cancel</Button>
        </Link>
      </div>
    </form>
  );
}

LocationForm =  reduxForm({
  form: 'locationform',
  validate: siteValidation
})(LocationForm);

LocationForm = connect(
  state => ({ initialValues: state.site.editSite }),
)(LocationForm)

export default LocationForm