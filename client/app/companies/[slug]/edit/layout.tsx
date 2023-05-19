"use client";

import Card from "@/app/components/Card";
import UnAuthorizedPage from "@/app/components/UnAuthorizedPage";
import { Store } from "@/redux/store";
import { useSelector } from "react-redux";
import CompanyEditNavbar from "./components/CompanyEditNavbar";

const CompaniesEditLayout = ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const { id, name, role } = useSelector((store: Store) => store.user);

  if (
    !id ||
    !name ||
    (role !== "COMPANY" && role !== "COMPANY_USER") ||
    name !== decodeURI(slug)
  )
    return <UnAuthorizedPage />;

  return (
    <div className="sm:max-w-[600px] md:max-w-[860px] lg:max-w-[1140px] mx-auto px-3 md:px-0">
      <div className="my-5">編輯企業資訊</div>
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full md:w-[28%]">
          <CompanyEditNavbar companyName={slug} />
        </div>
        <div className="w-full md:w-[72%]">
          <Card classnames="p-4 md:p-6">{children}</Card>
        </div>
      </div>
    </div>
  );
};

export default CompaniesEditLayout;
