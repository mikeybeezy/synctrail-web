import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { userActions } from '../../../actions';
import { textInput } from '../../../shared/form-elements'
import { reduxForm, Field, reset } from "redux-form";
import { Button } from 'react-bootstrap';
import { validation } from '../../../shared/form-validations';

function NewForm(props) {

  const { handleSubmit} = props
  const dispatch = useDispatch();
  const location = useLocation();

  const formSubmit = (values) => {
    const { from } = location.state || { from: { pathname: "/" } };
    dispatch(userActions.newPassword(values, from));
    dispatch(reset('form'));
  }

  return (
    <main className="d-flex align-items-center justify-content-center">
      <div  className="container">
        <div className="col-lg-4 offset-lg-4">
          <h3 className="text-center">Forgot Password</h3>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mb-2">
              <Field name="email" type="email" component={textInput} label="Email"/>
            </div>
            <div className="mb-3 mt-4">
              <Button variant="primary" type="submit" className="app-btn">Send reset password instructions</Button>
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

NewForm =  reduxForm({
  form: 'form',
  validate: validation
})(NewForm);


const mapStateToProps = (state) => {
  return { email: ""  };
};

export default connect(mapStateToProps, { userActions })(NewForm);
