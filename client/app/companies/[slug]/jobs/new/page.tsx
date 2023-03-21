"use client";

import React, { useState } from "react";
import Card from "@/app/components/Card";
import SkillPicker from "../../components/SkillPicker";

const NewJobPage = (props: any) => {
  const { params } = props;
  const [formData, setFormData] = useState({
    vacanciesName: "",
    vacanciesTime: "",
    vacanciesWorkExperience: "",
    vacanciesEducation: "",
    vacanciesDepartment: "",
    vacanciesOther: "",
    vacanciesSafe: "",
    county: [],
    vacanciesDistrict: "",
    vacanciesAddress: "",
    vacanciesSalaryType: "",
    vacanciesTopSalary: 0,
    vacanciesDownSalary: 0,
    vacanciesDescription: "",
    vacanciesRequirement: "",
    vacanciesQuantity: 0,
    vacanciesCondition: "",
    skill: [],
    vacanciesWatchType: "",
  });

  return (
    <div className="pt-5 px-3 md:px-0 m-auto h-full sm:max-w-[600px] md:max-w-[860px] lg:max-w-[1140px]">
      <div className="text-2xl">新增職缺</div>
      <div className="flex flex-col md:flex-row gap-5">
        <Card classnames="w-full md:w-[70%]">
          <div className="p-5 flex flex-col gap-3">
            <div>基本資訊</div>
            <div>
              <div className="text-sm flex gap-1">
                職務 <div className="text-xs text-red-500">*</div>
              </div>
              <div>
                <SkillPicker />
              </div>
            </div>
          </div>
        </Card>
        <div>推薦文章</div>
      </div>
      {params.slug}公司 新增職缺頁面
    </div>
  );
};

export default NewJobPage;
