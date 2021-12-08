const scheduleValidation = (values) => {
  const errors = {};

  if(!values.guard_profile_id) {
    errors.guard_profile_id = 'required';
  }

  if(!values.location_id){
    errors.location_id = 'required'
  }

  if(!values.client_id){
    errors.client_id = 'required'
  }

  if(!values.client_id){
    errors.client_id = 'required'
  }

  if(!values.from_date){
    errors.from_date = 'required'
  }

  if(!values.days_shift){
    errors.days_shift = 'required'
  }
 
  return errors;
};

export default scheduleValidation;