import React from "react";
import Card from "@/app/components/Card";
import Image from "next/image";
import Link from "next/link";
import JobBreadcrumbs from "../../components/JobBreadcrumbs";
import TinyJobInfoCard from "@/app/components/SearchContainer/TinyJobInfoCard";
import Mybutton from "../../../../components/MyButton";
import Detail from "@/app/components/SearchContainer/JobInfoCard/Detail";
import SkillTag from "@/app/components/SearchContainer/JobInfoCard/SkillTag";
import { SaveButton } from "@/app/components/SearchContainer/JobInfoCard/Action";
import MyButton from "../../../../components/MyButton";
import { Vacancy } from "@/app/components/SearchContainer/JobInfoCard";

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

const JobPage = async (props: any) => {
  const { params } = props;

  const data = await fetchJobById(params.jobId);
  const vacancy: {
    companyId: string;
    companyName: string;
    companyTitle: string;
    companyNumber: number;
    companyCounty: string;
    companyDistrict: string;
    companyAddress: string;
    companyEmail: string;
    companyImageUrl: string | null;
    skills: string;
    county: string;
    vacancies: Vacancy;
  } = data.data;

  // console.log(vacancy);

  const {
    companyName,
    companyImageUrl,
    skills,
    county,
    vacancies: {
      vacanciesId,
      vacanciesName,
      vacanciesDescription,
      vacanciesRequirement,
    },
  } = vacancy;

  const techs = skills.split(",");

  const renderedSkillTag = techs.map((tech) => (
    <SkillTag key={tech} skill={tech} />
  ));

  return (
    <div className="sm:max-w-[600px] md:max-w-[860px] lg:max-w-[1140px] w-full m-auto relative pt-6">
      <div className="mb-2">
        <JobBreadcrumbs companyName={companyName} vacancyName={vacanciesName} />
      </div>
      <Card classnames="p-6 flex flex-col md:flex-row">
        <div className="w-full md:w-[70%] md:mr-5 lg:mr-20">
          <div className="flex flex-col gap-2">
            <div className="text-2xl">{vacanciesName}</div>
            <div className="flex items-center gap-2">
              <Link href={`/companies/${vacanciesName}`} target="_blank">
                <div className="relative w-[1.8rem] h-[1.8rem] border-solid border border-[#e2e6e4] cursor-pointer">
                  <Image
                    src={companyImageUrl ? companyImageUrl : "/PCCUResume.png"}
                    alt="companyLogo"
                    fill
                    sizes="100%"
                  />
                </div>
              </Link>
              <Link href={`/companies/${companyName}`} target="_blank">
                <div className="text-lg font-bold hover:underline cursor-pointer">
                  {companyName}
                </div>
              </Link>
            </div>
          </div>
          <div className="flex gap-2 my-5 md:hidden">
            <SaveButton className="" />
            <Link href={`/apply-for-job/${vacanciesId}`}>
              <MyButton classnames="bg-blue-400 hover:bg-blue-500 text-white text-base">
                立即應徵
              </MyButton>
            </Link>
          </div>
          <div>
            <div className="mt-2">
              <div className="text-lg">職缺描述</div>
              <div className="mt-2 whitespace-pre-line">
                {vacanciesDescription}
              </div>
            </div>
            <div className="mt-2">
              <div className="text-lg">職務需求</div>
              <div className="mt-2 whitespace-pre-line">
                {vacanciesRequirement}
              </div>
            </div>
          </div>
          <div className="flex gap-5 items-center mt-10">
            <Link href={`/apply-for-job/${vacanciesId}`}>
              <Mybutton classnames="text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-600 md:text-lg md:w-[7rem] md:h-[3rem]">
                立即應徵
              </Mybutton>
            </Link>
            <Link
              href={`/companies/${companyName}/jobs`}
              className="hover:underline text-blue-500"
            >
              查看所有職缺
            </Link>
          </div>
        </div>
        <div className="w-full md:w-[30%] flex flex-col gap-2">
          <div className="gap-2 hidden md:flex">
            <SaveButton />
            <Link href={`/apply-for-job/${vacanciesId}`}>
              <MyButton classnames="bg-blue-400 hover:bg-blue-500 text-white text-base">
                立即應徵
              </MyButton>
            </Link>
          </div>
          <div className="my-5 md:mt-10">
            <Detail vacancy={{ ...vacancy.vacancies, county }} />
          </div>
          <div className="flex gap-1">{renderedSkillTag}</div>
          <div className="mt-5 flex flex-col gap-2">
            <div className="text-sm text-slate-700">應徵此職缺的人也應徵了</div>
            <TinyJobInfoCard vacancy={{ ...vacancy.vacancies }} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobPage;
