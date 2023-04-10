import Card from "@/app/components/Card";
import Content from "./Content";
import Detail from "./Detail";
import Action from "./Action";
import CompanyAction from "./CompanyAction";
import { Skill } from "@/app/companies/[slug]/components/SkillPicker";

export interface Vacancy {
  // #: 沒用到
  companyId?: string; // 公司id
  companyName: string; // 公司名稱
  companyImageUrl?: string | null; // 公司LogoURL
  vacanciesId?: string; // 職缺id
  teacherId?: string; // 審核教師id #
  vacanciesName: string; // 職缺名稱
  vacanciesTime: string; // 職缺時段 #
  vacanciesDescription: string; // 職缺描述
  vacanciesRequirement: string; //職缺需求
  vacanciesWorkExperience: string; // 工作經驗需求
  vacanciesEducation: string; // 教育程度
  vacanciesDepartment: string; // 職務部門 #
  vacanciesSafe: string; // 保險
  vacanciesOther: string; // 其他事項
  vacanciesCondition: string; // 面試流程
  vacanciesQuantity: number; // 招收人數
  vacanciesDistrict: string; // 區
  vacanciesAddress: string; // 地址
  vacanciesCreateTime?: string; // 創建時間 #
  applyCount?: number; // 已應徵人數(投履歷就算)
  vacanciesView?: number; // 瀏覽次數
  vacanciesDownSalary: number; // 底薪
  vacanciesTopSalary: number; // 最高薪水
  vacanciesSalaryType: "hour" | "month"; // 薪水型態(時or月)
  skills: string | Skill[]; // 技能需求
  county: string | string[]; // city
  teacherValidType?: "審查中" | "審查通過" | "審查不通過";
  vacanciesWatchType: "公開" | "隱藏" | "暫停";
}

interface Props {
  vacancy: Vacancy;
}

const JobInfoCard = ({ vacancy }: Props) => {
  return (
    <Card>
      <div className="flex flex-col md:flex-row p-5 pb-0 gap-6">
        <div className="w-full md:w-8/12">
          <Content vacancy={vacancy} />
        </div>
        <div className="w-full md:w-4/12">
          <Detail vacancy={vacancy} />
        </div>
      </div>
      <div className="px-5 py-3 md:p-5">
        <Action vacancy={vacancy} />
      </div>
      <CompanyAction vacancy={vacancy} />
    </Card>
  );
};

export default JobInfoCard;
