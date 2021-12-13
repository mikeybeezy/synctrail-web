import React  from 'react';
import { Button } from 'react-bootstrap';
import { selectField, textInput } from 'shared-lib/src/form-elements';
import { reduxForm, Field } from "redux-form";
import { validation } from 'shared-lib/src/validation';

function FormDetails(props) {
  const { handleSubmit, onSubmit, status, orderTemplates } = props
  return (
    <form>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            {status === "edit" 
              ? 
               <Field 
                  name="order_title" 
                  type="text" 
                  component={textInput} 
                  label="Order title" 
                  placeholder="Order title..."
                />
              :
              <Field 
                name="order_title" 
                component={selectField} 
                label="Select Order" 
                options={orderTemplates && orderTemplates} 
                placeholder="Select order..."
                optionname="guardOrder"
              />
            }
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
  );
}

FormDetails =  reduxForm({
  form: 'guarantor-form',
  enableReinitialize: true,
  validate: validation
})(FormDetails);

export default FormDetails