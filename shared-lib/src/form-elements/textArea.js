import React from "react";

const renderTextArea = ({input, label, placeholder,  meta: { touched, error, warning }}) => (
  <div>
    <label>{label}</label>
    <textarea {...input} placeholder={placeholder} rows="5" cols="40" className="form-control" style={{height: 'auto'}}/>
    {touched && ((error && <span className="form-error">{error}</span>) || (warning && <span className="form-error">{warning}</span>))}
  </div>
);

export default renderTextArea

