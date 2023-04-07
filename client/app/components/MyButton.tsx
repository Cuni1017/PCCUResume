import React from "react";

export const Button = ({
  children,
  classnames,
  disabled,
  ...rest
}: {
  children: React.ReactNode;
  classnames: string;
  disabled?: boolean;
  [key: string]: any;
}) => {
  return (
    <button
      disabled={disabled ? disabled : undefined}
      {...rest}
      className={`py-2 px-3 border-none disabled:bg-slate-100 disabled:cursor-not-allowed cursor-pointer rounded ${
        classnames ? classnames : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
