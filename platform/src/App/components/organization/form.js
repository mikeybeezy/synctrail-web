import React from 'react';
import { Button } from 'react-bootstrap';
import { reduxForm, Field } from "redux-form";
import { textInput, textArea } from 'shared-lib/src/form-elements';
import { validation } from 'shared-lib/src/validation';

function OrganizationForm(props) {
  const { handleSubmit, status  } = props
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <Field 
                name="display_name" 
                type="text" 
                component={textInput} 
                label="Display Name" 
                placeholder="Display name..."
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <Field 
                name="business_name" 
                type="text" 
                component={textInput} 
                label="Business Name" 
                placeholder="Business name..."
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <Field 
                name="platform_notes" 
                type="text" 
                component={textArea} 
                label="Platform notes" 
                placeholder="Platform notes..."
              />
            </div>
          </div>
        </div>
        <div className="mb-3 mt-4 form-footer">
          <Button variant="primary" type="submit">
            {status === "newForm" ? 'Send' : 'Update'}
          </Button>
          <Button variant="default" onClick={props.handleModalClose} className="mx-3">Cancel</Button>
        </div>
      </form>
    </div>
  );
}


OrganizationForm =  reduxForm({
  form: 'organizationform',
  enableReinitialize: true,
  validate: validation
})(OrganizationForm);

export default OrganizationForm