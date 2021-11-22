import React, { useEffect } from 'react';
import {connect,  useDispatch  } from 'react-redux';
import { tourActions } from '../../../actions';
import TourForm from "../tours/form";

function NewTour(props) {
  const dispatch = useDispatch();

  const showResults = (values) => {
    dispatch(tourActions.newTour(values));
  }

  return (
    <div  className="container">
      <div className="col-lg-12">
        <TourForm onSubmit={showResults}/>
      </div>
    </div>
  );
}

export default NewTour