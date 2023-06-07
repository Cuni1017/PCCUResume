"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Card from "@/app/components/Card";
import Link from "next/link";
import CompletenessCard from "./CompletenessCard";
import { useGetCompanyAbout } from "@/hooks/company/useCompanyAbout";

import { getIsFullfillLexicalRegex } from "@/util/getIsFullfillLexicalRegex";

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

//應為富文本的key值
const LexicalKeys = [
  "companyAboutTalk",
  "companyAboutEnvironment",
  "companyAboutMedia",
  "companyAboutMission",
  "companyAboutService",
  "companyAboutWelfare",
];

const CompanyEditNavbar = ({ companyName }: { companyName: string }) => {
  const { data } = useGetCompanyAbout({ companyName });
  const [completenessPercent, setCompletenessPercent] = useState(0);

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
        if (data.companyAboutBasic[key])
          LexicalKeys.includes(key)
            ? getIsFullfillLexicalRegex(data.companyAboutBasic[key])
              ? fulfillQuantity++
              : null
            : fulfillQuantity++;
      });

    if (data.companyAboutService)
      CompanyAboutInfoKeys.forEach((key) => {
        if (data.companyAboutService[key])
          LexicalKeys.includes(key)
            ? getIsFullfillLexicalRegex(data.companyAboutService[key])
              ? fulfillQuantity++
              : null
            : fulfillQuantity++;
      });

    if (data.companyAboutWelfare)
      CompanyBenefitInfoKeys.forEach((key) => {
        if (data.companyAboutWelfare[key])
          LexicalKeys.includes(key)
            ? getIsFullfillLexicalRegex(data.companyAboutWelfare[key])
              ? fulfillQuantity++
              : null
            : fulfillQuantity++;
      });

    return Math.ceil((fulfillQuantity / totalQuantity) * 100);
  }, [data]);

  useEffect(() => {
    if (!data.companyId) return;
    setCompletenessPercent(getCompletenessPercent());
  }, [data, getCompletenessPercent]);

  return (
    <div className="flex flex-col gap-2">
      <Card classnames="p-5 flex gap-2">
        <CompletenessCard value={completenessPercent} />
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
