const siteValidation = (values) => {
  const errors = {};

  if(!values.name) {
    errors.name = 'required';
  }

  if(!values.code) {
    errors.code = 'required'
  }

  if (!values.contact_person_phone_number) {
    errors.contact_person_phone_number = 'required';
  } else if (values.contact_person_phone_number && values.contact_person_phone_number.length < 10) {
    errors.contact_person_phone_number = 'required';
  }

  if(!values.address_line_1) {
    errors.address_line_1 = 'required';
  }

  if(!values.contact_person_full_name){
    errors.contact_person_full_name = 'required'
  }

   if (!values.contact_person_email) {
    errors.contact_person_email = 'required';
  } else if (
    values.contact_person_email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contact_person_email)
  ) {
    errors.contact_person_email = 'required validate email';
  }

  if(!values.phone_number) {
    errors.phone_number = 'required'
  }

  return errors;
};

export default siteValidation;