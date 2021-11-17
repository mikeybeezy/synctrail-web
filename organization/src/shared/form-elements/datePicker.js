import React from "react";
import DatePicker from "react-datepicker";

const DatePickerRender = ({input, label, placeholder,  selected, required, meta: { touched, error, warning, invalid }}) => (
  <div>
   <label>{label}</label>
    <DatePicker
      className="form-control"
      {...input}
      selected={selected}
      autoComplete='off'
      onChange={value => { input.onChange(value)}}
      onBlur={() => input.onBlur(input.value)}
      required={required}
      placeholderText={placeholder}
      dateForm="MM/DD/YYYY"
    />
    {touched && (error && <br/>)}
    {touched && ((error && <span className="form-error">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

export default DatePickerRender