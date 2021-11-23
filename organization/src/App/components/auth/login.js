import React, {useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { userActions } from '../../../actions';
import { textInput } from 'shared-lib/src/form-elements';
import { validation } from 'shared-lib/src/validation';
import { reduxForm, Field } from "redux-form";
import { Button } from 'react-bootstrap';

function Login(props) {
  const { handleSubmit} = props
  const dispatch = useDispatch();
  const location = useLocation();
  
  const loginSubmit = (values) => {
    const { from } = location.state || { from: { pathname: "/" } };
    dispatch(userActions.userLogin(values, from));
  }

  return (
    <main className="d-flex align-items-center">
      <div  className="container">
        <div className="col-lg-4 offset-lg-4">
          <h3 className="text-center">Login</h3>
          <form onSubmit={handleSubmit(loginSubmit)}>
            <div className="form-group">
              <Field name="email" type="email" component={textInput} label="Email"/>
            </div>
            <div className="form-group">
              <Field name="password" type="password" component={textInput} label="Password"/>
            </div>
            <div className="mb-3 mt-3">
              <Button variant="primary" size="lg" type="submit" className="app-btn">Login</Button>
            </div>
            <Link to="/password/new" className="btn btn-link">Forgot Password</Link>
            <Link to="/confirmation/resend" className="btn btn-link">Re-send confirmation instructions</Link>
            <Link to="/admin/users/unlock/request" className="btn btn-link">Request unlock email</Link>
          </form>
        </div>
      </div>
    </main>
  );
}

Login =  reduxForm({
  form: 'loginform',
  validate: validation
})(Login);


const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { userActions })(Login);
