import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import jwt from "jsonwebtoken";
import Card from "@/app/components/Card";
import EditJob from "../../../components/EditJob.tsx";
import UnAuthorizedPage from "@/app/components/UnAuthorizedPage";

const fetchJobById = async (vacancyId: string) => {
  const url = `http://localhost:8080/vacancies/${vacancyId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1RVREVOVCIsImlkIjoiUzIwMjMwMzA4MjAiLCJ1c2VybmFtZSI6ImNvcnkiLCJzdWIiOiJjb3J5IiwiaWF0IjoxNjgwODYzNDM1LCJleHAiOjE2NzkxNjA0Njd9.tKWBTuGFs1GoD2xnM1hxWlXoztjsfbWSKBA5eJQaVc0`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch");

  const resJson = await res.json();
  const vacancy = {
    ...resJson.vacancies,
    skills: resJson.skills,
    county: resJson.county,
  };

  // return res.json();
  return vacancy;
};

const JobEditPage = async (props: any) => {
  const { params } = props;

  const companyName = decodeURI(params.slug);
  const cookieStore = cookies();
  const JWT = cookieStore.get("JWT")?.value;

  if (!JWT) return <UnAuthorizedPage />;
  const user = jwt.decode(JWT) as { name: string } | null;

  if (!user || user.name !== companyName) return <UnAuthorizedPage />;

  const vacancy = await fetchJobById(params.jobId);
  // const vacancy = {
  //   ...data.vacancies,
  //   skills: data.skills,
  //   county: data.county,
  // };

  return (
    <div className="pt-5 px-3 md:px-0 m-auto h-full sm:max-w-[600px] md:max-w-[860px] lg:max-w-[1140px]">
      <div className="text-2xl">修改職缺</div>
      <div className="flex flex-col lg:flex-row gap-5">
        <Card classnames="w-full lg:w-[72%]">
          <EditJob
            vacancy={vacancy}
            companyName={companyName}
            jobId={decodeURI(params.jobId)}
          />
        </Card>
        <div>推薦文章</div>
      </div>
    </div>
  );
};

export default JobEditPage;
