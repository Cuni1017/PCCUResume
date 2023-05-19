"use client";

import React, { useCallback } from "react";
import { usePathname } from "next/navigation";
import Card from "@/app/components/Card";
import Link from "next/link";
import CompletenessCard from "./CompletenessCard";
import { useGetCompanyAbout } from "@/hooks/useCompanyAbout";

const CompanyInfoKeys = ["companyName", "companyNumber"];
const CompanyBasicInfoKeys = [
  "companyAboutUrl",
  "companyAboutEmployeeQuantity",
  "companyAboutHaveMoney",
  "companyAboutTalk",
  "companyAboutEnvironment",
  "companyAboutContactPerson",
  "companyAboutContactNumber",
];
const CompanyAboutInfoKeys = [
  "companyAboutMedia",
  "companyAboutMission",
  "companyAboutService",
  "companyFacebookUrl",
  "companyInstagramUrl",
  "companyTwitterUrl",
];
const CompanyBenefitInfoKeys = ["companyAboutWelfare"];

const CompanyEditNavbar = ({ companyName }: { companyName: string }) => {
  const { data } = useGetCompanyAbout({ companyName });
  const getCompletenessPercent = useCallback(() => {
    if (!data.companyId) return 0;
    let totalQuantity =
      CompanyInfoKeys.length +
      CompanyBasicInfoKeys.length +
      CompanyAboutInfoKeys.length +
      CompanyBenefitInfoKeys.length;
    let fulfillQuantity = 0;

    CompanyInfoKeys.forEach((key) => {
      if (data[key]) fulfillQuantity++;
    });

    if (data.companyAboutBasic)
      CompanyBasicInfoKeys.forEach((key) => {
        if (data.companyAboutBasic[key]) fulfillQuantity++;
      });

    if (data.companyAboutService)
      CompanyAboutInfoKeys.forEach((key) => {
        if (data.companyAboutService[key]) fulfillQuantity++;
      });

    if (data.companyAboutWelfare)
      CompanyBenefitInfoKeys.forEach((key) => {
        if (data.companyAboutWelfare[key]) fulfillQuantity++;
      });

    return Math.ceil((fulfillQuantity / totalQuantity) * 100);
  }, [data]);

  {
    getCompletenessPercent();
  }

  return (
    <div className="flex flex-col gap-2">
      <Card classnames="p-5 flex gap-2">
        <CompletenessCard value={getCompletenessPercent()} />
        <div className="flex flex-col gap-1">
          <div className="text-sm text-blue-500">公司資訊完整度</div>
          <div className="text-xs text-slate-500">
            提供詳細且完整的公司資訊，有助於提升求職者的應徵轉換率。
          </div>
        </div>
      </Card>
      <Card classnames="flex flex-col py-2">
        <EditNavbarItem link="" label="基本資訊" companyName={companyName} />
        <EditNavbarItem
          link="/about"
          label="關於公司"
          companyName={companyName}
        />
        <EditNavbarItem
          link="/benefits"
          label="公司福利"
          companyName={companyName}
        />
      </Card>
    </div>
  );
};

export default CompanyEditNavbar;

const EditNavbarItem = ({
  link,
  label,
  companyName,
}: {
  link: string;
  label: string;
  companyName: string;
}) => {
  const pathname = usePathname();
  const baseURL = `/companies/${companyName}/edit`;

  return (
    <Link
      className={`p-2 text-sm hover:bg-gray-300 ${
        pathname === `${baseURL}${link}`
          ? "border-0 border-l-2 border-solid border-blue-500"
          : ""
      }`}
      href={`${baseURL}/${link}`}
    >
      {label}
    </Link>
  );
};
