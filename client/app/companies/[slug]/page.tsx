import CompanyHeader from "./components/CompanyHeader/CompanyHeader";
import ContentAction from "./components/CompanyContent/ContentAction";
import { notFound } from "next/navigation";

const fetchCompany = async (companyName: string) => {
  const url = `http://localhost:8080/company/${companyName}`;
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
    searchParams,
  } = props;

  const data = await fetchCompany(companyName);

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
