import React from "react";
import Card from "../components/Card";

const ResumePage = () => {
  return (
    <div>
      履歷列表
      <ResumeCard />
    </div>
  );
};

const ResumeCard = () => {
  return (
    <Card className="bg-white border-solid border-gray-300 border shadow">
      <div className="px-2">
        <h3>My Resume</h3>
      </div>
      <hr />
      <div>Footer</div>
    </Card>
  );
};

export default ResumePage;
