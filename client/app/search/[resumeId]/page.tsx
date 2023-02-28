import React from "react";

const ResumePage = (props: any) => {
  const { params } = props;
  return <div>ReusmeID為{params.resumeId}的個人履歷瀏覽頁面</div>;
};

export default ResumePage;
