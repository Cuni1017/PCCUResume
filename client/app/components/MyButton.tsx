import React from "react";

export const Button = ({
  children,
  classNames,
  ...rest
}: {
  children: React.ReactNode;
  classNames: string;
  [key: string]: any;
}) => {
  return (
    <button
      {...rest}
      className={`py-2 px-3 border-none disabled:bg-slate-100 cursor-pointer rounded ${
        classNames ? classNames : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
