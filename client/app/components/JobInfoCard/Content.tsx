import Card from "@/app/components/Card";
import Link from "next/link";
import SkillTag from "./SkillTag";
import { Vacancy } from ".";
import Image from "next/image";

const Content = ({ vacancy }: { vacancy: Vacancy }) => {
  const {
    skills,
    companyName,
    companyImageUrl,
    vacanciesId,
    vacanciesName,
    vacanciesDescription,
    vacanciesRequirement,
  } = vacancy;

  // @ts-ignore
  const techs: string[] = skills ? skills.split(",") : [];

  const renderedSkillTag = techs.map((tech) => (
    <SkillTag key={tech} skill={tech} />
  ));

  const regex = /"text":"([^"]*)"/g;
  const arr = [
    ...vacanciesDescription.matchAll(regex),
    ...vacanciesRequirement.matchAll(regex),
  ];
  const vacancyContent = arr.map((ar) => ar[1]); //富文本的內容

  return (
    <div className="flex gap-3">
      <div className="hidden lg:block w-2/12">
        <Link href={`/companies/${companyName}`} target="_blank">
          <Card classnames="flex justify-center w-[70px] h-[70px] m-auto">
            <Image
              src={companyImageUrl ? companyImageUrl : "/PCCUResume.png"}
              alt={`${companyName}'s Logo`}
              width={72}
              height={72}
            />
          </Card>
        </Link>
      </div>
      <div className="w-full flex flex-col overflow-x-clip gap-4">
        <div className="flex gap-4 lg:gap-0">
          <Link href={`/companies/${companyName}`} target="_blank">
            <Card classnames="lg:hidden flex justify-center w-[50px] h-[50px] m-auto">
              <Image
                src={companyImageUrl ? companyImageUrl : "/PCCUResume.png"}
                alt={`${companyName}'s Logo`}
                width={52}
                height={52}
              />
            </Card>
          </Link>
          <div className="flex flex-col">
            <Link
              href={`/companies/${companyName}/jobs/${vacanciesId}`}
              target="_blank"
              className="flex items-center"
            >
              <div className="w-full flex items-center text-xl hover:underline">
                {vacanciesName}
              </div>
            </Link>
            <Link
              href={`/companies/${companyName}`}
              target="_blank"
              className="flex items-center"
            >
              <div className="w-full flex items-center text-[1rem] leading-[1.60rem] hover:underline">
                {companyName}
              </div>
            </Link>
          </div>
        </div>
        <div className="line-clamp-3">
          {vacancyContent.length > 0
            ? vacancyContent.join(" ")
            : `${vacanciesDescription} ${vacanciesRequirement}`}
        </div>
        <div className="overflow-hidden">
          <div className="pb-6   mb-[-1.5rem] overflow-x-scroll z-10">
            <div className="relative">
              <div className="flex gap-1 z-10 whitespace-nowrap">
                {renderedSkillTag}
              </div>
              {/* <div
                className="absolute w-full"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255, 255, 255, 0) 95%, rgba(240, 240, 240, 1) 100%",
                }}
              ></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
