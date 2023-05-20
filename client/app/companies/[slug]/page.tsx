import CompanyHeader from "./components/CompanyHeader/CompanyHeader";
import ContentAction from "./components/CompanyContent/ContentAction";
import { notFound } from "next/navigation";
import CompanyInfoCard from "./components/CompanyContent/CompanyInfoCard";
import CompanyAboutContent from "./components/CompanyContent/AboutContent";
import { Company } from "@/app/admin/components/CompanyRegistCard";
import {
  CompanyAboutBasic,
  CompanyAboutService,
  CompanyAboutWelfare,
} from "./edit/page";
import CompanyContentNavbar from "./components/CompanyContent/CompanyContentNavbar";

export type CompanyAbout = Company & {
  companyAboutBasic: CompanyAboutBasic;
  companyAboutService: CompanyAboutService;
  companyAboutWelfare: CompanyAboutWelfare;
};

const fetchCompany = async (companyName: string) => {
  const url = `http://localhost:8080/company/${companyName}/company-about`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1RVREVOVCIsImlkIjoiUzIwMjMwMzA4MjAiLCJ1c2VybmFtZSI6ImNvcnkiLCJzdWIiOiJjb3J5IiwiaWF0IjoxNjgwODYzNDM1LCJleHAiOjE2NzkxNjA0Njd9.tKWBTuGFs1GoD2xnM1hxWlXoztjsfbWSKBA5eJQaVc0",
    },
  });
  if (!res.ok) {
    notFound();
    // throw new Error("Failed to fetch");
  }

  return res.json();
};

const CompanyPage = async (props: any) => {
  const {
    params: { slug: companyName },
  } = props;

  const { data: companyInfo } = await fetchCompany(companyName);

  return (
    <div className="flex flex-col gap-4">
      <CompanyHeader companyName={companyName} />
      <div className="px-3 md:p-0 flex flex-col gap-4 w-full md:max-w-[860px] lg:max-w-[1140px] m-auto">
        <div className="flex justify-between items-center text-lg">
          <div>關於</div>
          <div className="text-sm flex gap-1 sm:gap-2">
            <ContentAction companyName={companyName} />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-2 w-full md:w-[75%]">
            <CompanyAboutContent companyInfo={companyInfo} />
          </div>
          <div className="flex flex-col gap-2 w-full md:w-[25%]">
            <CompanyInfoCard companyInfo={companyInfo} />
            <CompanyContentNavbar companyInfo={companyInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
