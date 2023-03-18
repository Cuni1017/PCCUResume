import React from "react";

const ResumeItemContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full md:max-w-[700px] flex">{children}</div>
    </div>
  );
};

export default ResumeItemContent;
