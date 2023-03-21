import React from "react";

const JobEditPage = (props: any) => {
  const { params, searchParams } = props;

  return (
    <div>
      {params.slug}公司 職缺ID為{params.jobId}的編輯頁面
    </div>
  );
};

export default JobEditPage;
