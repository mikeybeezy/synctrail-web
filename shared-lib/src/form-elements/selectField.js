import React from "react";

export const selectField = ({ input, label, options, optionname,  type, meta: { touched, error } }) => {
  return (
    <div className="form-group">
      <label className="mb-1" style={{fontSize: "14px"}}> {label} </label>
      <select {...input} className="form-control">
        <option value="">{label}</option>
          {options && options.map(option => (
            <option key={option.id} value={  optionname === "guardOrder" ? option.name : option.id}>
              { optionname === "guardOrder" ? option.order_title : option.name}
            </option>
          ))}
      </select>
      {touched && error && (
       <span className="form-error">{error}</span>
      )}
    </div>
  )
}

export default selectField
