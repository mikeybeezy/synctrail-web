import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button , Table} from 'react-bootstrap';
import { textInput } from '../../../shared/form-elements'
import { reduxForm, Field } from "redux-form";

function Location(props) {
  const { handleSubmit} = props

  return (
   <div  className="container">
      <form onSubmit={handleSubmit}>
        <h5 className="py-2">Add Client</h5>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <Field name="business_name" type="text" component={textInput} label="Client Name"/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <Field name="phone_number" type="text" component={textInput} label="Phone"/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <Field name="email" type="email" component={textInput} label="Email"/>
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
          <Button variant="default">Cancel</Button>
        </div>
      </form>
    </div>
  );
}


Location =  reduxForm({
  form: 'locationform',
})(Location);

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { })(Location);
