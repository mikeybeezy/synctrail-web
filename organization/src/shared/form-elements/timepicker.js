import React from "react";

const SelectField = ({ placeholder,input, onChange, label, type, meta: { touched, error } }) => {
  
  const list_time = []
  const times = () => {
    for (let step = 0; step < 24; step++) {
      const  h = step > 9 ? step : "0"+step
      const mm = 30
      const dd = step > 12 ? "PM" : "AM"
      list_time.push(h+":"+"00")
      list_time.push(h+":"+mm)
    }
    return list_time
  }
  times()

  const checkValue = (event) => {
    console.log(event.target.value)
    input.onChange(event)
  }
  return (
    <div className="form-group">
     <label className="mb-1" style={{fontSize: "14px"}}> {label} </label>
      <select {...input} className="form-control" onChange = { (e) => checkValue(e)}>
        <option value="">{placeholder}</option>
        {list_time && list_time.map((data, key) => {
          return (
            <option key={data.id} value={data}>
              {data}
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
