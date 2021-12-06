import React from 'react';

class CheckboxGroup extends React.Component {
  checkboxGroup() {
    let {label, required, options, input, meta} = this.props;
    return options && options.map((option, index) => {
      return (
      <div className="checkgox-div" key={index}>
        <label className="d-flex align-itemes-center">
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
      </div>)
    });
  }

  render() {
    return (
      <div className="d-flex align-itemes-center">
        {this.checkboxGroup()}
      </div>
    )
  }
}


export default CheckboxGroup
