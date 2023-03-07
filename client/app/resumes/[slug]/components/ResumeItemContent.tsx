import React from "react";

const ResumeItemContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
      <div className="w-full md:max-w-[700px] flex">{children}</div>
    </div>
  );
};

export default ResumeItemContent;
