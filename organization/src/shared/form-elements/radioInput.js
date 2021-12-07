
import React from 'react';

const radioInput = ({ label, required,type, name, options,  input, meta: { touched, error }, ...rest}) => (
  <div className="d-flex align-items-center">
    {options && options.length > 0 
      ? 
        options.map((option, index) => {
          return(
            <label key={index} className="checkgox-div d-flex align-items-center">
              <input {...input} type={type} checked={1 === input.value}/>
              <span className="checkbox-name">{option.name}</span>
            </label>
          )
        })
      :
      null
    }
    {touched && error && (
     <span className="form-error" style={{paddingTop: '30px'}}>{error}</span>
    )}
  </div>
);

export default radioInput;

