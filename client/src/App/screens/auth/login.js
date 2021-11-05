import React, {useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { userActions } from '../../../actions';
import { textInput } from '../../../shared/form-elements'
import { reduxForm, Field } from "redux-form";
import { Button } from 'react-bootstrap';

function Login(props) {
  const { handleSubmit} = props
  const dispatch = useDispatch();

  useEffect(() => {

  }, []);


  const loginSubmit = (values) => {
    dispatch(userActions.userLogin(values));
  }

  return (
    <main className="d-flex align-items-center">
      <div  className="container">
        <div className="col-lg-4 offset-lg-4">
          <h3 className="text-center">Login</h3>
          <form onSubmit={handleSubmit(loginSubmit)}>
            <div className="mb-2">
              <Field name="email" type="email" component={textInput} label="Email"/>
            </div>
            <div className="mb-3">
              <Field name="password" type="password" component={textInput} label="Password"/>
            </div>

            <div className="mb-3 mt-4">
              <Button variant="secondary" size="lg" type="submit" className="app-btn">Login</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

Login =  reduxForm({
  form: 'loginform',
})(Login);


const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { userActions })(Login);
