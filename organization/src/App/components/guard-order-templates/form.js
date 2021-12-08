import React from 'react';
import { Button } from 'react-bootstrap';
import { reduxForm, Field } from "redux-form";
import { textInput } from 'shared-lib/src/form-elements';
import { validation } from 'shared-lib/src/validation';

function TemplateForm(props) {
  const { handleSubmit, status  } = props
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <Field 
                name="order_title" 
                type="text" 
                component={textInput} 
                label="Order Title" 
                placeholder="Order title..."
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


TemplateForm =  reduxForm({
  form: 'templateform',
  enableReinitialize: true,
  validate: validation
})(TemplateForm);

export default TemplateForm