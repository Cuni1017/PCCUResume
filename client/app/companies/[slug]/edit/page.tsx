import React from "react";

const CompanyEditPage = (props: any) => {
  const { params } = props;

  return <div>{decodeURI(params.slug)} 公司編輯頁面</div>;
};

export default CompanyEditPage;
