import React from "react";
import Card from "@/app/components/Card";
import { CompanyAbout } from "../../page";
import Lexical from "@/app/components/Lexical/App";
import { getIsFullfillLexicalRegex } from "@/util/getIsFullfillLexicalRegex";

const CompanyAboutContent = ({
  companyInfo,
}: {
  companyInfo: CompanyAbout;
}) => {
  const { companyAboutService, companyAboutWelfare, companyAboutBasic } =
    companyInfo;

  return (
    <>
      {companyAboutBasic ? (
        <>
          {companyAboutBasic.companyAboutTalk &&
          getIsFullfillLexicalRegex(companyAboutBasic.companyAboutTalk) ? (
            <AboutContentItem label="公司介紹" id="companyAboutTalk">
              <Lexical
                value={companyAboutBasic.companyAboutTalk}
                editable={false}
              />
            </AboutContentItem>
          ) : null}
          {companyAboutBasic.companyAboutEnvironment &&
          getIsFullfillLexicalRegex(
            companyAboutBasic.companyAboutEnvironment
          ) ? (
            <AboutContentItem
              label="公司環境"
              id="companyAboutEnvironment"
              classnames="order-last"
            >
              <Lexical
                value={companyAboutBasic.companyAboutEnvironment}
                editable={false}
              />
            </AboutContentItem>
          ) : null}
        </>
      ) : null}
      {companyAboutService ? (
        <>
          {companyAboutService.companyAboutService &&
          getIsFullfillLexicalRegex(companyAboutService.companyAboutService) ? (
            <AboutContentItem label="產品或服務" id="companyAboutService">
              <Lexical
                value={companyAboutService.companyAboutService}
                editable={false}
              />
            </AboutContentItem>
          ) : null}
          {companyAboutService.companyAboutMission &&
          getIsFullfillLexicalRegex(companyAboutService.companyAboutMission) ? (
            <AboutContentItem label="使命" id="companyAboutMission">
              <Lexical
                value={companyAboutService.companyAboutMission}
                editable={false}
              />
            </AboutContentItem>
          ) : null}
          {companyAboutService.companyAboutMedia &&
          getIsFullfillLexicalRegex(companyAboutService.companyAboutMedia) ? (
            <AboutContentItem label="媒體曝光" id="companyAboutMedia">
              <Lexical
                value={companyAboutService.companyAboutMedia}
                editable={false}
              />
            </AboutContentItem>
          ) : null}
        </>
      ) : null}
      {companyAboutWelfare ? (
        <>
          {companyAboutWelfare.companyAboutWelfare &&
          getIsFullfillLexicalRegex(companyAboutWelfare.companyAboutWelfare) ? (
            <AboutContentItem label="員工福利" id="companyAboutWelfare">
              <Lexical
                value={companyAboutWelfare.companyAboutWelfare}
                editable={false}
              />
            </AboutContentItem>
          ) : null}
        </>
      ) : null}

      <div className="my-[100rem]">my-100rem</div>
    </>
  );
};

export default CompanyAboutContent;

const AboutContentItem = ({
  id,
  label,
  children,
  classnames,
}: {
  id?: string;
  label: string;
  children: React.ReactNode;
  classnames?: string;
}) => {
  return (
    <Card
      id={id}
      classnames={`p-4 flex flex-col gap-3 ${classnames ? classnames : ""}`}
    >
      <div className="text-slate-500">{label}</div>
      {children}
    </Card>
  );
};
