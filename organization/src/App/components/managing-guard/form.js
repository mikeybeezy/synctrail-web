import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector  } from 'react-redux';
import { Button } from 'react-bootstrap';
import { pricePicker, fileUpload } from '../../../shared/form-elements';
import { textInput, datePicker } from 'shared-lib/src/form-elements';
import { guarantorValidation } from 'shared-lib/src/validation';
import { reduxForm, Field } from "redux-form";
import GuarantorForm from "../managing-guard/guarantorForm";
import moment from "moment";

function GuardForm(props) {
  const { handleSubmit, initialize, formStatus } = props
  const guardSalary = useSelector(state => state.initial.guardSalary);  
  useEffect(() => {
    if(formStatus === "newForm") {
      initialize({ guardform: "" })
    }
  }, []);
  const handleGuarntor = (values) => {
    props.onSelectGuarntor(values); 
  }
  return (
    <form onSubmit={handleSubmit}>
      <h5 className="py-2">Guests History</h5>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <Field 
              name="first_name" 
              type="text" 
              component={textInput} 
              label="First Name" 
              placeholder="First name..."
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <Field 
              name="last_name" 
              type="text" 
              component={textInput} 
              label="Last Name" 
              placeholder="Last name..."
            />
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
            showMonthDropdown
            showYearDropdown
            inputValueFormat="DD-MM-YYYY"
          />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <Field 
              name="origin_state" 
              type="text" 
              component={textInput} 
              label="State of Origin" placeholder="state of origin..."/>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <Field 
              name="national_id_number" 
              type="number" 
              component={textInput} 
              label="National Id" 
              placeholder="000-000-000-0000..."
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <Field 
              name="phone_number" 
              type="number" 
              component={textInput} 
              label="Phone" 
              placeholder="Phone..."
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div  className="form-group">
            <Field 
              name="full_address" 
              type="text" 
              component={textInput} 
              label="Address" 
              placeholder="Address..."
            />
          </div>
        </div>
      </div>
    
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <Field 
              name="email" 
              type="email" 
              component={textInput} 
              label="Email" 
              placeholder="Email..."
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <Field 
              name="organization_id_number" 
              type="number" 
              component={textInput} 
              label="Guard ID" 
              placeholder="Guard id..."
            />
          </div>
        </div>
      </div>
      <div>
        <Field 
          name="salary_frequency" 
          component={pricePicker} 
          label="Salary Type" 
          options={guardSalary} 
          placeholder="Salary type..."
          formStatus={formStatus}
        />
      </div>
      <Field 
        name="photo" 
        component={fileUpload} 
        type="file" 
      />
      <GuarantorForm 
        onSelectGuarntor={handleGuarntor} 
        formStatus={formStatus}
      />
      <div className="mb-3 mt-4 form-footer">
        <Button variant="primary" type="submit">
          {formStatus === "newForm" ? 'Save' : 'Update'}
        </Button>
        <Link to="/admin/guard/list" className="px-3">
          <Button variant="default">Cancel</Button>
        </Link>
      </div>
    </form>
  );
}


GuardForm =  reduxForm({
  form: 'guardform',
  validate: guarantorValidation
})(GuardForm);

GuardForm = connect(
  state => ({ initialValues: state.guard.editGuard }),
)(GuardForm)

export default GuardForm