import CompanyHeader from "../components/CompanyHeader/CompanyHeader";
import ContentAction from "../components/CompanyContent/ContentAction";
import ContentSearchBar from "../components/CompanyContent/ContentSearchBar";
import JobStateCounter from "../components/CompanyContent/JobStateCounter";
import JobInfoCard, {
  Vacancy,
} from "@/app/components/SearchContainer/JobInfoCard";
import PaginationBar from "@/app/components/SearchContainer/PaginationBar";
import Link from "next/link";
import Image from "next/image";
import MyButton from "@/app/components/MyButton";
import Card from "@/app/components/Card";
import { notFound } from "next/navigation";

const fetchJobs = async (companyName: string) => {
  const url = `http://localhost:8080/company/${companyName}/vacancies`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1RVREVOVCIsImlkIjoiUzIwMjMwMzA4MjAiLCJ1c2VybmFtZSI6ImNvcnkiLCJzdWIiOiJjb3J5IiwiaWF0IjoxNjgwODYzNDM1LCJleHAiOjE2NzkxNjA0Njd9.tKWBTuGFs1GoD2xnM1hxWlXoztjsfbWSKBA5eJQaVc0",
    },
    cache: "no-store",
  });
  if (!res.ok) notFound();

  return res.json();
};

const CompanyJobs = async (props: any) => {
  const {
    params: { slug: companyName },
    searchParams,
  } = props;
  const searchTerm = searchParams.q || "";

  const data = await fetchJobs(companyName);
  const totalJobs = data.data.total;
  const eachPageJobNumber = data.data.size;
  const vacancies = data.data.companyVacanciesDto;

  const renderedJobs = vacancies
    .filter((vacancy: Vacancy) => vacancy.vacanciesName.includes(searchTerm))
    .map((vacancy: Vacancy) => {
      return <JobInfoCard key={vacancy.vacanciesId} vacancy={vacancy} />;
    });

  return (
    <div className="flex flex-col gap-4">
      <CompanyHeader companyName={companyName} />
      <div className="w-full">
        <div className="max-w-[24rem] sm:max-w-[36rem] md:max-w-none m-auto px-3 relative">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-lg">
              <div>職缺</div>
              <div className="text-sm flex gap-1 sm:gap-2">
                <ContentAction companyName={companyName} />
              </div>
            </div>
            <JobStateCounter vacancies={vacancies} />
            <div className="flex gap-3 w-full md:max-w-[16rem]">
              <ContentSearchBar />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-[80%]">
              {renderedJobs.length > 0 ? (
                <>
                  {renderedJobs}
                  <div className="flex items-center justify-center">
                    <PaginationBar
                      count={Math.ceil(totalJobs / eachPageJobNumber)}
                      page={searchParams.page ? parseInt(searchParams.page) : 1}
                    />
                  </div>
                </>
              ) : (
                <Card classnames="p-5 flex flex-col items-center gap-2">
                  <div className="relative w-[5rem] h-[5rem]">
                    <Image src={"/error.png"} alt="error" fill sizes="100%" />
                  </div>
                  <div className="text-slate-500">沒有符合搜尋條件的結果。</div>
                  <Link href={`/companies/${companyName}/jobs/new`}>
                    <MyButton classnames="text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700">
                      新增職缺
                    </MyButton>
                  </Link>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyJobs;
