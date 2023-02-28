import React from "react";

const JobPage = (props: any) => {
  const { params, searchParams } = props;
  console.log(params);

  return (
    <div>
      {params.slug}公司 職缺ID為{params.jobId}的頁面
    </div>
  );
};

export default JobPage;
