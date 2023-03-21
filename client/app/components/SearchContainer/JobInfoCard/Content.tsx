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

  const techs = skills.split(",");

  const renderedSkillTag = techs.map((tech) => (
    <SkillTag key={tech} skill={tech} />
  ));

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
            {/* <img
              src="https://media.cakeresume.com/image/upload/s--5JU713tR--/c_pad,fl_png8,h_100,w_100/v1577246016/q3dazcv6tw7gx2xygu4y.png"
              alt=""
            /> */}
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
                {/* Frontend Engineer */}
                {vacanciesName}
              </div>
            </Link>
            <Link
              href={`/companies/${companyName}`}
              target="_blank"
              className="flex items-center"
            >
              <div className="w-full flex items-center text-[1rem] leading-[1.60rem] hover:underline">
                {/* Splashtop Inc. */}
                {companyName}
              </div>
            </Link>
          </div>
        </div>
        <div className="line-clamp-3">
          {/* 前端工程師將與後端工程師、設計師、產品經理或其他夥伴組成跨職能團隊，針對遠端桌面、遠端連線服務的後台支援系統各項機能，翻新設計、改進用戶體驗，並根據不同產品線的需求完成新功能 */}
          {vacanciesDescription} {vacanciesRequirement}
        </div>
        <div className="overflow-hidden">
          <div className="pb-4 mb-[-1.5rem] overflow-x-scroll z-10">
            <div className="relative">
              <div className="flex gap-1 z-10">{renderedSkillTag}</div>
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
