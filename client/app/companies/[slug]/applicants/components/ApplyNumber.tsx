import React from "react";

interface Props {
  applyNumber: number;
}

const ApplyNumber = ({ applyNumber }: Props) => {
  return (
    <div className="bg-blue-500 text-white rounded-full w-[1.3rem] h-[1.3rem] mx-2 flex items-center justify-center">
      {applyNumber}
    </div>
  );
};

export default ApplyNumber;
