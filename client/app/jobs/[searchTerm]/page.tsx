import InfoCard from "@/app/components/SearchContainer/InfoCard";

const fetchJobs = async (searchParams: any) => {
  // console.log(searchParams);
  const {
    location,
    tech,
    salary_type,
    salary_currency,
    ["salary_range[max]"]: max_salary,
    ["salary_range[min]"]: min_salary,
  } = searchParams;

  const locations = location
    ? location instanceof Array
      ? "county=" + location.join("&county=")
      : location
    : "";

  const techs = tech
    ? tech instanceof Array
      ? "technology=" + tech.join("&technology=")
      : tech
    : "";

  const salaryMin = min_salary ? `salaryMin=${min_salary}` : "";
  const salaryMax = max_salary ? `salaryMax=${max_salary}` : "";
  const salaryType = salary_type
    ? `salaryType=${salary_type.replace("per_", "")}`
    : "";
  // const salaryCurrency = salary_currency
  //   ? `salaryCurrency=${min_salary}`
  //   : null;

  const url = `http://localhost:8080/vacancies?${locations}&${techs}&${salaryMin}&${salaryMax}&${salaryType}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImlkIjoiQzY2MDQyMzgxMCIsInVzZXJuYW1lIjoiY29yeTEiLCJzdWIiOiJjb3J5MSIsImlhdCI6MTY3OTEyNzg3MiwiZXhwIjoxNjc3NDI0OTA1fQ.fImtD2hMpgWUQmQZlCwkTQeGwFtEQkiVliLLRblMpV4",
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

  console.log(data.data.pageVacancies);

  // console.log(params);
  // console.log(searchParams);
  return (
    <>
      <InfoCard />
    </>
  );
};

export default JobsSearchPage;
