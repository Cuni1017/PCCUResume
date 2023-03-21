import React from "react";

const JobStateCounter = () => {
  return (
    <div className="flex gap-2 text-sm">
      <div className="flex gap-2">
        職缺總計
        <span>1</span>
      </div>
      <div className="text-[#d1d6d4]">|</div>
      <div className="flex gap-2">
        公開
        <span>0</span>
      </div>
      <div className="flex gap-2">
        隱藏
        <span>0</span>
      </div>
      <div className="flex gap-2">
        暫停
        <span>0</span>
      </div>
    </div>
  );
};

export default JobStateCounter;
