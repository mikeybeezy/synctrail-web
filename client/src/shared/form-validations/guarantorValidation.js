const guarantorValidation = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'required';
  } else if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'required validate email';
  }

  if (!values.phone_number) {
    errors.phone_number = 'required';
  } else if (values.phone_number && values.phone_number.length < 10) {
    errors.phone_number = 'required';
  }
  if(!values.first_name) {
    errors.first_name = 'required';
  }

  if(!values.last_name) {
    errors.last_name = 'required';
  }

  if(!values.relationship_to_guard){
    errors.relationship_to_guard = 'required'
  }

  if(!values.national_id_number){
    errors.national_id_number = 'required'
  }

  if(!values.full_address){
    errors.full_address = 'required'
  }

  if(!values.birthdate){
    errors.birthdate = 'required'
  }

  return errors;
};

export default guarantorValidation;