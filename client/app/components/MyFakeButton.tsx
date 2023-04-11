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
    <div
      {...rest}
      className={`py-2 px-3 border-none cursor-pointer rounded ${
        classnames ? classnames : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Button;
