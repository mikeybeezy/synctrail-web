import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { textInput } from '../../../shared/form-elements'
import { clientValidation } from '../../../shared/form-validations';
import { reduxForm, Field } from "redux-form";

function ClientForm(props) {
  const { handleSubmit, editClient, initialize, newForm } = props
  useEffect(() => {
    if(newForm === "newForm") {
      initialize({ ClientForm: "" })
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="py-2">Add Client</h5>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <Field name="business_name" type="text" component={textInput} label="Client Name" placeholder="Client name..."/>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <Field name="phone_number" type="number" component={textInput} label="Phone" placeholder="Phone..."/>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <Field name="email" type="email" component={textInput} label="Email" placeholder="Email..."/>
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
      </div>
      <div className="mb-3 mt-4 form-footer">
        <Button variant="primary" type="submit">Save</Button>
        <Link to="/admin/clients/list" className="px-3">
          <Button variant="default">Cancel</Button>
        </Link>
      </div>
    </form>
  );
}

ClientForm =  reduxForm({
  form: 'clientform',
  validate: clientValidation
})(ClientForm);

ClientForm = connect(
  state => ({ initialValues: state.client.editClient }),
)(ClientForm)

export default ClientForm