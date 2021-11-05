import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { userActions } from '../../../actions';
import { textInput } from '../../../shared/form-elements'
import { validation } from '../../../shared/form-validations';
import { reduxForm, Field } from "redux-form";
import { Button } from 'react-bootstrap';

function EditForm(props) {

  const { handleSubmit} = props
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(props.location.search);

  const reset_password_token = query.get('reset_password_token');

  const formSubmit = (values) => {
    values.reset_password_token = reset_password_token;
    dispatch(userActions.resetPassword(values));
  }

  return (
    <main className="d-flex align-items-center justify-content-center">
      <div  className="container">
        <div className="col-lg-4 offset-lg-4">
          <h3 className="text-center">Change Password</h3>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mb-2">
              <Field name="password" type="password" component={textInput} label="New Password"/>
            </div>
            <div className="mb-2">
              <Field name="password_confirmation" type="password" component={textInput} label="Confirm New Password"/>
            </div>
            <div className="mb-3 mt-4">
              <Button variant="primary" type="submit" className="app-btn">Change Password</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

EditForm =  reduxForm({
  form: 'editform',
  validate: validation
})(EditForm);


const mapStateToProps = (state) => {
  return { password: "", password_confirmation: "" };
};

export default connect(mapStateToProps, { userActions })(EditForm);
