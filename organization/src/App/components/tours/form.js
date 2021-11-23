import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import  RenderForm  from '../tours/shared/renderForm';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { textInput } from 'shared-lib/src/form-elements';
import { tourValidation } from 'shared-lib/src/validation';

function Form(props) {
  const { handleSubmit, formStatus, initialize, tourId,  clientId, currentTourData, tourStop, loading } = props
  const currentLocation = useSelector(state => state.tour.currentlocation);
  useEffect(() => {
    if (tourId){
      initialize({
        name: currentTourData && currentTourData.name,
        tour_stops: tourStop && tourStop.length === 0 ? [''] : tourStop
      });
    }else {
      props.initialize({
        name: "", tour_stops: [''],
      });
    }
  }, []);

   if (loading) {
    return <div className="page_loading">Loading..</div>
  }

  return (
    <form  onSubmit={handleSubmit}>
      <div className="tour-form">
        <h6 className="py-1">Add Tour</h6>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <Field name="name" type="text" component={textInput} label="Name" placeholder="name..."/>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="py-3">Add Tour Stops</h6>
        <FieldArray
          name="tour_stops"
          component={RenderForm}
          change={props.change}
          formStatus={formStatus}
          locationData={currentLocation}
        />
      </div>
      <div className="d-flex align-items-center">
        <Link to={`/admin/clients/${clientId}/tours`}>
          <Button variant="secondary" style={{marginRight: 10}}>Cancel</Button>
        </Link>
        <Button variant="primary" type="submit">{formStatus === "editForm" ? "Update" : "Save"}</Button>
      </div>
    </form>
  );
}

Form =  reduxForm({
  form: 'userform',
  validate: tourValidation
})(Form);

export default Form