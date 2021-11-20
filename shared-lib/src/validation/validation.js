const validation = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'required';
  } else if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'required validate email';
  }
  if (!values.password) {
    errors.password = 'required';
  }

  if(!values.display_name) {
    errors.display_name = 'required';
  }

  if(!values.business_name) {
    errors.business_name ='required'
  }

  if(!values.platform_notes) {
    errors.platform_notes = 'required'
  }

  return errors;
};

export default validation;