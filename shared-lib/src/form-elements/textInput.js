import React from "react";

export const textInput = ({
  input,
  type,
  placeholder,
  label,
  defaultValue,
  id,
  autoFocus,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <div>
      { label ?  <label className="mb-1" style={{ fontSize: "14px" }}> {label}</label> : null}
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        id={id}
        autoComplete="off"
        className="form-control"
        autoFocus={autoFocus}
      />
      {touched && error && <span className="form-error">{error}</span>}
    </div>
  );
};

export default textInput;
