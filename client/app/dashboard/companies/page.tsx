"use client";

import Card from "@/app/components/Card";
import { useGetCompany } from "@/hooks/companyJob/useCompanyJob";
import { Store } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import MyButton from "@/app/components/MyButton";
import UnAuthorizedPage from "@/app/components/UnAuthorizedPage";

const CompaniesPage = () => {
  const { name, role } = useSelector((store: Store) => store.user);
  if (role !== "COMPANY") return <UnAuthorizedPage />;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useGetCompany(name);
  const {
    companyCounty,
    companyDistrict,
    companyAddress,
    companyImageUrl,
    companyName,
    companyNumber,
    companyTitle,
  } = data;

  return (
    <>
      <div className="flex justify-between">
        <p className="text-sm">徵才專頁</p>
        <div className="flex items-center">
          <Link href={`/companies/${companyName}/edit`}>
            <MyButton classnames="text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700">
              修改公司資訊
            </MyButton>
          </Link>
        </div>
      </div>
      <Card classnames="flex gap-2">
        <Link href={`/companies/${companyName}`} className="flex p-4">
          <div className="relative w-[3.5rem] h-[3.5rem]">
            <Image
              src={companyImageUrl ? companyImageUrl : "/PCCUResume.png"}
              alt={`${companyName}'s Logo`}
              fill
              sizes="100%"
            />
          </div>
        </Link>

        <div className="py-4">
          <Link
            href={`/companies/${companyName}`}
            className="hover:underline text-lg font-bold"
          >
            {companyName}
          </Link>
          <div className="text-sm text-slate-500">{companyTitle}</div>
          <div>
            {companyCounty}
            {companyDistrict}
            {companyAddress}
          </div>
        </div>
      </Card>
    </>
  );
};

export default CompaniesPage;
