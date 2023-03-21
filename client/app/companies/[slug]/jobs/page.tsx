import CompanyHeader from "../components/CompanyHeader/CompanyHeader";
import ContentAction from "../components/CompanyContent/ContentAction";
import ContentSearchBar from "../components/CompanyContent/ContentSearchBar";
import JobStateCounter from "../components/CompanyContent/JobStateCounter";
import JobInfoCard, {
  Vacancy,
} from "@/app/components/SearchContainer/JobInfoCard";
import PaginationBar from "@/app/components/SearchContainer/PaginationBar";

const fetchJobs = async (companyName: string) => {
  const url = `http://localhost:8080/company/${companyName}/vacancies`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImlkIjoiQzY2MDQyMzgxMCIsInVzZXJuYW1lIjoiY29yeTEiLCJzdWIiOiJjb3J5MSIsImlhdCI6MTY3OTEyNzg3MiwiZXhwIjoxNjc3NDI0OTA1fQ.fImtD2hMpgWUQmQZlCwkTQeGwFtEQkiVliLLRblMpV4",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch");

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
      return (
        <JobInfoCard key={vacancy.vacanciesId} vacancy={vacancy} self={true} />
      );
    });

  return (
    <div className="flex flex-col gap-4">
      <CompanyHeader page="/jobs" companyName={companyName} />
      <div className="w-full">
        <div className="max-w-[24rem] sm:max-w-[36rem] md:max-w-none m-auto px-3 relative">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-lg">
              <div>職缺</div>
              <div className="text-sm flex gap-1 sm:gap-2">
                <ContentAction companyName={companyName} />
              </div>
            </div>
            <JobStateCounter />
            <div className="flex gap-3 w-full md:max-w-[16rem]">
              <ContentSearchBar />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-[80%]">
              {renderedJobs}
              <div className="flex items-center justify-center">
                <PaginationBar
                  count={Math.ceil(totalJobs / eachPageJobNumber)}
                  page={searchParams.page ? parseInt(searchParams.page) : 1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2"></div>
    </div>
  );
};

export default CompanyJobs;
