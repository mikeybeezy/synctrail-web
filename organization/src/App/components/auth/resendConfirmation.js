import React  from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../../actions';
import { reduxForm, Field, reset } from "redux-form";
import { Button } from 'react-bootstrap';
import { textInput } from 'shared-lib/src/form-elements';
import { validation } from 'shared-lib/src/validation';

function ResendConfirmation(props) {
  const { handleSubmit} = props
  const dispatch = useDispatch();

  const formSubmit = (values) => {
    dispatch(userActions.resendConfirmation(values));
    dispatch(reset('confirmationForm'));
  }

  return (
    <main className="d-flex align-items-center justify-content-center">
      <div  className="container">
        <div className="col-lg-4 offset-lg-4">
          <h3 className="text-center mb-4">Request confirmation email</h3>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mb-2">
              <Field name="email" type="email" component={textInput} label="Email"/>
            </div>
            <div className="mb-3 mt-3">
              <Button variant="primary" type="submit" className="app-btn">Request Confirmation Email</Button>
            </div>

            <div className="text-center">
              <Link to="/login" className="btn btn-link">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

ResendConfirmation =  reduxForm({
  form: 'confirmationForm',
  validate: validation
})(ResendConfirmation);


const mapStateToProps = (state) => {
  return { email: ""  };
};

export default connect(mapStateToProps, { userActions })(ResendConfirmation);
