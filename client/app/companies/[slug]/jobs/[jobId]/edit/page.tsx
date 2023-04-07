import Card from "@/app/components/Card";
import EditJob from "../../../components/EditJob.tsx";

const fetchJobById = async (vacancyId: string) => {
  const url = `http://localhost:8080/vacancies/${vacancyId}`;
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

const JobEditPage = async (props: any) => {
  const { params, searchParams } = props;

  const { data } = await fetchJobById(params.jobId);
  const vacancy = {
    ...data.vacancies,
    skills: data.skills,
    county: data.county,
  };

  return (
    <div className="pt-5 px-3 md:px-0 m-auto h-full sm:max-w-[600px] md:max-w-[860px] lg:max-w-[1140px]">
      <div className="text-2xl">修改職缺</div>
      <div className="flex flex-col lg:flex-row gap-5">
        <Card classnames="w-full lg:w-[72%]">
          <EditJob
            vacancy={vacancy}
            companyName={decodeURI(params.slug)}
            jobId={decodeURI(params.jobId)}
          />
        </Card>
        <div>推薦文章</div>
      </div>
    </div>
  );
};

export default JobEditPage;
