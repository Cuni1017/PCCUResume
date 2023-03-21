import React from "react";

const JobCopyPage = (props: any) => {
  const { params, searchParams } = props;

  return (
    <div>
      {params.slug}公司 職缺ID為{params.jobId}的複製職缺POST頁面
    </div>
  );
};

export default JobCopyPage;
