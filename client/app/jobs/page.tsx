import JobInfoCard, {
  Vacancy,
} from "../components/SearchContainer/JobInfoCard";
import NotFoundCard from "../components/SearchContainer/NotFoundCard";
import PaginationBar from "../components/SearchContainer/PaginationBar";

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

  if (page < 1) return null;

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
  //   ? `salaryCurrency=${salary_currency}`
  //   : "";

  const whichPage = page ? `page=${page}` : "";

  const url = `http://localhost:8080/vacancies?${locations}&${techs}&${salaryMin}&${salaryMax}&${salaryType}&${whichPage}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

const JobsSearchHomePage = async (props: any) => {
  const { searchParams } = props;

  const res = await fetchJobs(searchParams);
  if (!res) return <NotFoundCard />;

  const totalJobs = res.data.total;
  const eachPageJobQuantity = res.data.size;
  const vacancies: Vacancy[] = res.data.companyVacanciesDto;

  const totalPage = Math.ceil(totalJobs / eachPageJobQuantity);
  const currentPage = searchParams.page
    ? searchParams.page < 0
      ? 1
      : parseInt(searchParams.page)
    : 1;

  return (
    <>
      {searchParams.page < 1 || searchParams.page > totalPage ? (
        <NotFoundCard />
      ) : (
        <>
          {vacancies.length > 0 ? (
            <>
              {vacancies.map((vacancy) => {
                return (
                  <JobInfoCard key={vacancy.vacanciesId} vacancy={vacancy} />
                );
              })}
              <div className="flex justify-center mb-10">
                <PaginationBar count={totalPage} page={currentPage} />
              </div>
            </>
          ) : (
            <NotFoundCard />
          )}
        </>
      )}
    </>
  );
};

export default JobsSearchHomePage;
