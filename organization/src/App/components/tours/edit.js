import React, { useEffect } from 'react';
import { connect,  useDispatch  } from 'react-redux';
import { tourActions } from '../../../actions';
import { useParams } from 'react-router-dom';
import TourForm from "../tours/form";

function NewTour(props) {
  const { currentTourData, tourStop, loading } = props
  const dispatch = useDispatch();
  let { client_id, tour_id } = useParams();

  useEffect(() => {
    dispatch(tourActions.editTour(client_id, tour_id));
  }, []);


  const showResults = (values) => {
    dispatch(tourActions.updateTour(values, client_id, tour_id));
  }

  if (props.loading) {
    return <div className="page_loading">Loading..</div>
  }

  return (
    <div  className="container">
      <div className="col-lg-12">
        <TourForm 
          onSubmit={showResults} 
          formStatus="editForm" 
          tourId={tour_id}
          clientId={client_id}
          currentTourData={currentTourData && currentTourData}
          tourStop={tourStop && tourStop}
          loading={loading && loading}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.tour.loading,
    currentTourData: state.tour.currentTourData,
    tourStop: state.tour.tourStop,
  };
};

export default connect(mapStateToProps, { tourActions })(NewTour);

