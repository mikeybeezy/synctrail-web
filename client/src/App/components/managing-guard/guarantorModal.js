import React  from 'react';
import { Button } from 'react-bootstrap';
import { textInput, datePicker } from '../../../shared/form-elements'
import { reduxForm, Field } from "redux-form";
import { guarantorValidation } from '../../../shared/form-validations';
import moment from "moment";

function FormDetails(props) {
  const { handleSubmit, onSubmit, status } = props
  return (
    <div>
      <form>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <Field name="first_name" type="text" component={textInput} label="First Name" placeholder="First name..."/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <Field name="last_name" type="text" component={textInput} label="Last Name" placeholder="Last name..."/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <Field
                name="birthdate"
                normalize={value => (value ? moment(value).format('DD-MM-YYYY') : null)}
                component={datePicker}
                label="Date of Birth"
                placeholder="00/00/0000..."
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <Field name="relationship_to_guard" type="text" component={textInput} label="Relationship To Ex (The Guard)" placeholder="Relationship..."/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <Field name="national_id_number" type="number" component={textInput} label="National Id" placeholder="000-000-000-0000..."/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <Field name="phone_number" type="number" component={textInput} label="Phone" placeholder="Phone..."/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div  className="form-group">
                <Field name="full_address" type="text" component={textInput} label="Address" placeholder="Address..."/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <Field name="email" type="email" component={textInput} label="Email" placeholder="Email..."/>
            </div>
          </div>
        </div>
        <div className="mb-3 mt-4 form-footer">
          <Button variant="primary" onClick = {handleSubmit(values => onSubmit(values, "edit"))}>
            {status === "new" ? 'Send' : 'Update'}
          </Button>
          <Button variant="default" onClick={props.handleClose} className="mx-3">Cancel</Button>
        </div>
      </form>
    </div>
  );
}


FormDetails =  reduxForm({
  form: 'guarantor-form',
  enableReinitialize: true,
  validate: guarantorValidation
})(FormDetails);

export default FormDetails