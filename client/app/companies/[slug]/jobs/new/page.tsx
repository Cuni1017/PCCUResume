import Card from "@/app/components/Card";
import EditJob from "../../components/EditJob.tsx";
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

const NewJobPage = async (props: any) => {
  const {
    params: { slug: companyName },
  } = props;

  const data = await fetchCompany(companyName);

  return (
    <div className="pt-5 px-3 md:px-0 m-auto h-full sm:max-w-[600px] md:max-w-[860px] lg:max-w-[1140px]">
      <div className="text-2xl">新增職缺</div>
      <div className="flex flex-col lg:flex-row gap-5">
        <Card classnames="w-full lg:w-[72%]">
          <EditJob companyName={decodeURI(companyName)} jobId={""} />
        </Card>
        <div>推薦文章</div>
      </div>
    </div>
  );
};

export default NewJobPage;
