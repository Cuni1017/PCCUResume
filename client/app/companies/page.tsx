import React from "react";

const CompaneisPage = () => {
  return (
    <main className="md:max-w-[860px] lg:max-w-[1140px] m-auto px-3 md:p-0">
      <div className="max-w-[600px] md:max-w-none md:w-full mx-auto mt-5">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="w-full md:w-[80%]">
            搜尋公司頁面
            {/* <SearchContainer>{children}</SearchContainer> */}
          </div>
          <div className="w-full md:w-[20%]">最近瀏覽...</div>
        </div>
      </div>
    </main>
  );
};

export default CompaneisPage;
