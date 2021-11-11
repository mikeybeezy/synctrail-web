const clientValidation = (values) => {
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
  if(!values.business_name) {
    errors.business_name = 'required';
  }

  if(!values.address_line_1) {
    errors.address_line_1 = 'required';
  }

  if(!values.contact_person_full_name){
    errors.contact_person_full_name = 'required'
  }

  if (!values.contact_person_phone_number) {
    errors.contact_person_phone_number = 'required';
  } else if (values.contact_person_phone_number && values.contact_person_phone_number.length < 10) {
    errors.contact_person_phone_number = 'required';
  }
  
  if (!values.contact_person_email) {
    errors.contact_person_email = 'required';
  } else if (
    values.contact_person_email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contact_person_email)
  ) {
    errors.contact_person_email = 'required validate email';
  }
 

  return errors;
};

export default clientValidation;