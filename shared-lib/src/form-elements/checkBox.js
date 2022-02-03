import React from 'react';

const Checkbox = ({ label, required, name, options,  input, meta: { touched, error }, ...rest}) => (
  <div className="form-group mt-2">
	  <div style={{marginBottom: -5}}>
	    <input type="checkbox" {...input} />
	    <label style={{marginLeft: 10}}>{label}</label>
	  </div>
	  {touched && error && (
	   <span  className="form-error">{error}</span>
	  )}
	</div>
)

export default Checkbox;