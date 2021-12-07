import React from 'react';

const CheckboxGroup = ({ label, required, name, options,  input, meta: { touched, error }, ...rest}) => (
  <div className="d-flex align-items-center">
    {options && options.length > 0 
      ? 
        options.map((option, index) => {
          return(
            <div className="checkgox-div" key={index}>
              <label className="d-flex align-items-center">
                <input type="checkbox"
                  
                  name={`${input.name}[${index}]`}
                  value={option.id}
                  checked={input.value.indexOf(option.id) !== -1}
                  onChange={(event) => {
                    const newValue = [...input.value];
                    if (event.target.checked) {
                      newValue.push(option.id);
                    } else {
                      newValue.splice(newValue.indexOf(option.id), 1);
                    }
                    return input.onChange(newValue);
                  }}/>
                  <span className="checkbox-name">{option.name}</span>
              </label>
            </div>
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

export default CheckboxGroup;

