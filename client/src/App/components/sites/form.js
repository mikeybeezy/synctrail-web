import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button , Table} from 'react-bootstrap';
import { textInput, timepicker } from '../../../shared/form-elements'
import { reduxForm, Field } from "redux-form";

function LocationForm(props) {
  const { handleSubmit, editSite, initialize, newForm , client_id} = props
  useEffect(() => {
    if(newForm === "newForm") {
      initialize({ LocationForm: "" })
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="py-2">Add Site</h5>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <Field name="name" type="text" component={textInput} label="Site Name"/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <Field name="code" type="text" component={textInput} label="Site Number"/>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <Field name="address_line_1" type="text" component={textInput} label="Address Line 1"/>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <Field name="address_line_2" type="text" component={textInput} label="Address Line 2"/>
          </div>
        </div>
      </div>
      <h5 className="py-3">Contact Person</h5>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <Field name="contact_person_full_name" type="text" component={textInput} label="Name"/>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <Field name="contact_person_phone_number" type="text" component={textInput} label="Phone"/>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <Field name="contact_person_email" type="email" component={textInput} label="Email"/>
          </div>
        </div>
      </div>
      <div className="mb-3 mt-4">
        <Button variant="primary" type="submit">Save</Button>
        
        <Link to={`/admin/clients/${client_id}/sites`}>
          <Button variant="default">Cancel</Button>
        </Link>
      </div>
    </form>
  );
}

LocationForm =  reduxForm({
  form: 'locationform',
})(LocationForm);

LocationForm = connect(
  state => ({ initialValues: state.site.editSite }),
)(LocationForm)

export default LocationForm