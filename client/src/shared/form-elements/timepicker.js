import 'rc-time-picker/assets/index.css';
import React from 'react';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

const Timepicker = ({
  input: { name, value: omitValue, label, onChange, onBlur, ...inputProps },
  meta: omitMeta,touched, error,
  ...props
}) => {
  const [value, setValue] = React.useState(moment())
  const handleValueChange = (value) => {
    setValue(value)
    let timeFormat = value._d
    let hours = timeFormat.getHours();
    let minutes = timeFormat.getMinutes();
    let seconds = timeFormat.getSeconds();
    onChange(hours + "-" + minutes + "-" + seconds)
  }
  return (
    <div>
      <TimePicker onChange={handleValueChange}/>
    </div>
  )
}

export default Timepicker