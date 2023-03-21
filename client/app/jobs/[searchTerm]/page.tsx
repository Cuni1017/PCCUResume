import JobInfoCard, {
  Vacancy,
} from "@/app/components/SearchContainer/JobInfoCard";
import PaginationBar from "../../components/SearchContainer/PaginationBar";

const fetchJobs = async (searchParams: any) => {
  const {
    location,
    tech,
    salary_type,
    salary_currency,
    ["salary_range[max]"]: max_salary,
    ["salary_range[min]"]: min_salary,
    page,
  } = searchParams;

  const locations = location
    ? location instanceof Array
      ? "county=" + location.join("&county=")
      : "county=" + location
    : "";

  const techs = tech
    ? tech instanceof Array
      ? "technology=" + tech.join("&technology=")
      : "technology=" + tech
    : "";

  const salaryMin = min_salary ? `salaryMin=${min_salary}` : "";
  const salaryMax = max_salary ? `salaryMax=${max_salary}` : "";
  const salaryType = salary_type
    ? `salaryType=${salary_type.replace("per_", "")}`
    : "";
  // const salaryCurrency = salary_currency
  //   ? `salaryCurrency=${min_salary}`
  //   : null;

  const whichPage = page ? `page=${page}` : "";

  const url = `http://localhost:8080/vacancies?${locations}&${techs}&${salaryMin}&${salaryMax}&${salaryType}&${whichPage}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
};

const JobsSearchPage = async (props: any) => {
  const { params, searchParams } = props;

  const data = await fetchJobs(searchParams);
  const totalJobs = data.data.total;
  const eachPageJobNumber = data.data.size;
  // const currentPage = data.data.page;
  const vacancies: Vacancy[] = data.data.companyVacanciesDto;

  const renderedJobs = vacancies.map((vacancy) => {
    return <JobInfoCard key={vacancy.vacanciesId} vacancy={vacancy} />;
  });

  return (
    <>
      {renderedJobs}
      <div className="flex justify-center mb-10">
        <PaginationBar
          count={Math.floor(totalJobs / eachPageJobNumber + 1)}
          page={searchParams.page ? searchParams.page : 1}
        />
      </div>
    </>
  );
};

export default JobsSearchPage;
