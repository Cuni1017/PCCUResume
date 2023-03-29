import React from "react";

const ApplyForJobPage = (props: any) => {
  const { params } = props;

  return <div>應徵職缺ID為{params.jobId}的準備寄送履歷頁面</div>;
};

export default ApplyForJobPage;
