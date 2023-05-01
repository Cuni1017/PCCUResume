import React from "react";

const Card = ({
  children,
  classnames,
  disableBackground,
  ...rest
}: {
  children: React.ReactNode;
  disableBackground?: boolean;
  [key: string]: any;
}) => {
  return (
    <div
      className={`border-gray-100 shadow rounded-md ${
        disableBackground ? "" : "bg-white"
      } ${classnames ? classnames : ""}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
