import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FieldArray, reduxForm } from 'redux-form';
import  RenderForm  from '../tours/shared/renderForm';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Form(props) {
  const { handleSubmit } = props
  useEffect(() => {
    props.initialize({
      location: [''],
    });
  }, []);

  return (
    <form  onSubmit={handleSubmit}>
      <div>
        <h6 className="py-1">Add new location</h6>
        <FieldArray
          name="location"
          component={RenderForm}
          change={props.change}
          editForm="editForm"
        />
      </div>
      <div className="d-flex align-items-center">
        <Link to="/admin/users">
          <Button variant="secondary" style={{marginRight: 10}}>Cancel</Button>
        </Link>
        <Button variant="primary" type="submit">Save Location</Button>
      </div>
    </form>
  );
}

Form =  reduxForm({
  form: 'userform',
})(Form);

export default Form