import React, {useEffect} from "react";

const SelectField = ({ placeholder, formStatus, input, onChange,  label, options, optionname,  type, meta: { touched, error } }) => {
  const [active, setActive] = React.useState(false)
  const [price, setPrice] = React.useState()
  const checkValue = (event) => {
    setActive(true)
    const getObject = options && options.find(item => item.name === event.target.value)
    setPrice(getObject && getObject.price)
    input.onChange(event)
  }

  useEffect(() => {
   if(formStatus === "editForm") {
     setActive(true)
     const getObject = options && options.find(item => item.name === input.value)
     setPrice(getObject && getObject.price)
   }
  }, []);

  return (
    <div className="row">
      <div className={active === true ? "col-md-8" : "col-md-12"}>
        <label className="mb-1"> {label} </label>
        <select {...input} className="form-control" onChange = { (e) => checkValue(e)}>
          <option value="">{label}</option>
          {options && options.map(option => (
            <option key={option.name} value={option.name} price={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        {touched && error && (<span className="form-error">{error}</span>)}
      </div>
        {active && 
          <div className="col-md-4">
            <div>
              <label className="mb-1">Salary</label>
              <input type="text" placeholder={placeholder} className="form-control" value={price} disabled/>
            </div>
          </div>
        }
    </div>
  )
}

export default SelectField


