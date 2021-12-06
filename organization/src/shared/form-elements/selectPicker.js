import React from "react";
import { connect, useDispatch } from 'react-redux';
import { scheduleActions } from '../../actions';

const SelectField = ({ placeholder, disableOption,  formStatus, input, onChange,  label, options, optionname,  type, meta: { touched, error } }) => {
  const dispatch = useDispatch();

  const checkValue = (event) => {
    if(optionname === "clientId"){
      dispatch(scheduleActions.getSites(event.target.value));
    }
    input.onChange(event)
  }
  return (
    <div className="form-group">
      <label className="mb-1" style={{fontSize: "14px"}}> {label} </label>
      <select {...input} className="form-control" onChange = { (e) => checkValue(e)} disabled={disableOption}>
        <option value="">{placeholder}</option>
        {options && options.map((data, key) => {
          return (
            <option key={data.id} value={data.id}>
              {optionname === "guardProfile" ? data.first_name : optionname === "clientId" ? data.business_name : data.name}
            </option>
          )
        })}
      </select>
      {touched && error && (
       <span className="form-error">{error}</span>
      )}
    </div>
  )
}

export default SelectField
