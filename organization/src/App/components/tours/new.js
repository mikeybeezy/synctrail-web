import React, { useEffect } from 'react';
import {connect,  useDispatch  } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { tourActions } from '../../../actions';
import TourForm from "../tours/form";

function NewTour(props) {
  const dispatch = useDispatch();
  const { client_id } = useParams();

  useEffect(() => {
    dispatch(tourActions.getTourData(client_id));
  }, []);


  const showResults = (values) => {
    dispatch(tourActions.newTour(values, client_id));
  }

  return (
    <div  className="container">
      <div className="col-lg-12">
        <TourForm onSubmit={showResults} clientId={client_id}/>
      </div>
    </div>
  );
}

export default NewTour