import React from "react";

const CompanySettingPage = (props: any) => {
  const { params } = props;

  return (
    <div className="px-3 md:p-0 box-border w-full md:max-w-[860px] lg:max-w-[1140px] m-auto">
      {decodeURI(params.slug)} 公司設定頁面
    </div>
  );
};

export default CompanySettingPage;
