import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import React from "react";

function FileInput({
  name,
  type = "file",
  className,
  value,
  dir = "rtl",
  onChange,
  isRequired,
  lable,
  errors,
  validationSchema = {},
  ...field
}) {
  const errorMessages = errors?.[name];
  const hasError = !!(errors && errorMessages);
  console.log(value);

  return (
    <div className="mt-20 mb-20">
      <label
        htmlFor={name}
        className={`cursor-pointer border-2 border-primary-900 rounded-lg 
        px-3 py-2 text-primary-900 flex items-center justify-center gap-x-2
        ${className}`}
      >
        {lable}
        <ArrowUpTrayIcon className="w-5 h-5 " />
        <input
          {...field}
          id={name}
          type={type}
          name={name}
          dir={dir}
          onChange={onChange}
          required={isRequired}
          className="sr-only"
        />
      </label>
      {errors && errors[name] && (
        <span className="text-red-600 block text-xs mt-2">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}

export default FileInput;
