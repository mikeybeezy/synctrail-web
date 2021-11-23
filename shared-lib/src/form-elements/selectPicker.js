
import React, { useState } from "react";

const SelectField = ({ placeholder, formStatus, input, onChange,  label, options, optionname,  type, meta: { touched, error }}) => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <div className="form-group">
      <label className="mb-1" style={{fontSize: "14px"}}> {label} </label>
      <select {...input} className="form-control">
        <option value="">{label}</option>
          {options && options.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
      </select>
      {touched && error && (
       <span className="form-error">{error}</span>
      )}
    </div>
  );
};

export default SelectField


