import React from "react";

const SelectField = ({ placeholder, input, label, options, optionname,  type, meta: { touched, error } }) => {
  const [active, setActive] = React.useState(false)
  const [value, setValue] = React.useState()
  const onChange = (event) => {
    setActive(true)
  }
  return (
    <div className="row">
      <div className="col-md-6">
        <label className="mb-1"> {label} </label>
        <select {...input} className="form-control" onChange={onChange} value={value}>
          <option value="">{label}</option>
          {options && options.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {touched && error && (<span className="form-error">{error}</span>)}
      </div>
      <div className="col-md-6">
        {active && 
          <div>
            <label className="mb-1">Salary type amout</label>
            <input type="text" placeholder={placeholder} className="form-control" value="33.33"/>
          </div>
        }
      </div>
    </div>
  )
}

export default SelectField


