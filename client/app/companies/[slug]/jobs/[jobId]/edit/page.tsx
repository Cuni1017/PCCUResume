import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import jwt from "jsonwebtoken";
import Card from "@/app/components/Card";
import EditJob from "../../../components/EditJob.tsx";
import UnAuthorizedPage from "@/app/components/UnAuthorizedPage";
import { defaultTokenHeaders } from "@/hooks/shared";

const fetchJobById = async (vacancyId: string) => {
  const url = `http://localhost:8080/vacancies/${vacancyId}`;
  const res = await fetch(url, {
    method: "GET",
    ...defaultTokenHeaders,
  });
  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
};

const JobEditPage = async (props: any) => {
  const { params } = props;

  const companyName = decodeURI(params.slug);
  const cookieStore = cookies();
  const JWT = cookieStore.get("JWT")?.value;

  if (!JWT) return <UnAuthorizedPage />;
  const user = jwt.decode(JWT) as { name: string } | null;

  if (!user || user.name !== companyName) return <UnAuthorizedPage />;

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
