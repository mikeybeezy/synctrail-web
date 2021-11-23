const fieldArrayValidation = values => {
  const errors = {};
  if(!values.name){
    errors.name = 'required'
  }

  if (!values.tour_stops || !values.tour_stops.length) {
    errors.tour_stops = { _error: 'At least one member must be entered' };
  } else {
    const tourArrayErrors = [];
    values.tour_stops.forEach((tour_stops, tourIndex) => {
      const toursErrors = {};
      if (!tour_stops || !tour_stops.location_id) {
        toursErrors.location_id = 'Required';
        tourArrayErrors[tourIndex] = toursErrors;
      }
    });
    if (tourArrayErrors.length) {
      errors.tour_stops = tourArrayErrors;
    }
  }
  return errors;
};

export default fieldArrayValidation;
