import CompanyHeader from "./components/CompanyHeader/CompanyHeader";
import ContentAction from "./components/CompanyContent/ContentAction";
import { notFound } from "next/navigation";

const CompanyPage = (props: any) => {
  const {
    params: { slug: companyName },
    searchParams,
  } = props;

  // notFound();

  return (
    <div className="flex flex-col gap-4">
      <CompanyHeader companyName={companyName} />
      <div className="px-3 md:p-0">
        <div className="flex justify-between items-center text-lg">
          <div>關於</div>
          <div className="text-sm flex gap-1 sm:gap-2">
            <ContentAction companyName={companyName} />
          </div>
        </div>
        {decodeURI(companyName)} 公司介紹頁面
      </div>
    </div>
  );
};

export default CompanyPage;
