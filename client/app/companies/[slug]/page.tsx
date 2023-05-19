import CompanyHeader from "./components/CompanyHeader/CompanyHeader";
import ContentAction from "./components/CompanyContent/ContentAction";
import { notFound } from "next/navigation";
import CompanyInfoCard from "./components/CompanyContent/CompanyInfoCard";
import Card from "@/app/components/Card";

export interface CompanyAbout {
  companyId: string | null;
  aboutUrl: string | null;
  employeeQuantity: string | null;
  haveMoney: number | null;
  backgroundImageUrl: string | null;
  talk: string | null;
  contactPerson: string | null;
  logoImageUrl: string | null;
  environment: string | null;
  logoSavePath: string | null;
  backgroundSavePath: string | null;
  service: string | null;
  mission: string | null;
  media: string | null;
  twitterUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  welfare: string | null;
}

const fetchCompany = async (companyName: string) => {
  const url = `http://localhost:8080/company/${companyName}`; //company-about
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

  const data = await fetchCompany(companyName);
  // console.log(data);

  return (
    <div className="flex flex-col gap-4">
      <CompanyHeader companyName={companyName} />
      <div className="px-3 md:p-0 flex flex-col gap-4">
        <div className="flex justify-between items-center text-lg">
          <div>關於</div>
          <div className="text-sm flex gap-1 sm:gap-2">
            <ContentAction companyName={companyName} />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-2 w-full md:w-[75%]">
            {/* {decodeURI(companyName)} 公司介紹頁面 */}
            <Card classnames="p-4 flex flex-col gap-3">
              <div className="text-slate-500">公司介紹</div>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
              reprehenderit, aliquid aperiam dolore accusantium cumque
              repudiandae voluptatem asperiores necessitatibus vitae corporis
              optio illum dignissimos sint quisquam saepe, quae sed ab!
            </Card>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-[25%]">
            <CompanyInfoCard
              companyAbout={{
                haveMoney: 200,
                employeeQuantity: "1000人",
                aboutUrl: "https://www.example.com",
                address: "台北市大同區測試路",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
