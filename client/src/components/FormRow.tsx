import React from "react";

const FormRow = ({
  defaultValue,
  name,
  type,
  labelText,
  placeHolder,
  isError,
}: {
  defaultValue: string;
  name: string;
  type: string;
  labelText: string;
  placeHolder: string;
  isError: boolean;
}) => {
  return (
    <div className="form-row">
      <label
        htmlFor={name}
        className={isError ? "form-label red-label" : "form-label"}
      >
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeHolder}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
