import React from "react";

const CompanySettingPage = (props: any) => {
  const { params } = props;

  return <div>{decodeURI(params.slug)} 公司設定頁面</div>;
};

export default CompanySettingPage;
