import React from "react";

export const Button = ({
  children,
  classnames,
  ...rest
}: {
  children: React.ReactNode;
  classnames: string;
  [key: string]: any;
}) => {
  return (
    <button
      {...rest}
      className={`py-2 px-3 border-none disabled:bg-slate-100 cursor-pointer rounded ${
        classnames ? classnames : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
