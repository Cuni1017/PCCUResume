import React from "react";

const Card = ({
  children,
  classnames,
  ...rest
}: {
  children: React.ReactNode;
  [key: string]: any;
}) => {
  return (
    <div
      // border border-solid
      className={` border-gray-100 shadow rounded-md bg-white ${
        classnames ? classnames : ""
      }`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
