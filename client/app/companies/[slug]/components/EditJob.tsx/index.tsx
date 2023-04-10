"use client";

import React, { useState } from "react";
import SkillPicker from "../../components/SkillPicker";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
} from "@mui/material";

import Lexical, { initialJsonString } from "@/app/components/Lexical/App";
import { EditorState } from "lexical/LexicalEditorState";
import { LexicalEditor } from "lexical/LexicalEditor";
import { Vacancy } from "@/app/components/SearchContainer/JobInfoCard";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MyButton from "@/app/components/MyButton";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Skill } from "../../components/SkillPicker";
import AddressPicker from "@/app/components/AddressPicker";
import TaiwanPostalCode from "@/data/TaiwanPostalCode.json";
import Grid from "@mui/material/Unstable_Grid2"; //v2
import { usePostJob, usePutJob } from "@/hooks/companyJob/useCompanyJob";
import SnackBar from "@/app/components/SnackBar";

const initialVacancy: Vacancy = {
  companyName: "",
  vacanciesName: "", // 職務名稱
  vacanciesTime: "", // 工作時間
  vacanciesWorkExperience: "", // 工作經驗 // "需具備 n 年以上工作經驗" | "不限年資"
  vacanciesEducation: "博士以上", // 教育程度
  vacanciesDepartment: "", // 部門
  vacanciesOther: "", // 其他事項
  vacanciesSafe: "", // 保險
  county: "台北市", // 城市 id
  vacanciesDistrict: "中正區", // 區
  vacanciesAddress: "", // 地址
  vacanciesSalaryType: "hour", // 薪水類型 month or hour
  vacanciesTopSalary: 0,
  vacanciesDownSalary: 0,
  vacanciesDescription: "", // 職缺描述
  vacanciesRequirement: "", // 職務需求
  vacanciesQuantity: 1, // 招募人數
  vacanciesCondition: "", // 面試流程
  skills: "", //所需技能
  vacanciesWatchType: "公開",
};

// 需要檢查的欄位
const initialErrors = {
  vacanciesName: false,
  vacanciesTime: false,
  vacanciesWorkExperience: false,
  vacanciesEducation: false,
  vacanciesDepartment: false,
  // vacanciesOther: false,
  vacanciesSafe: false,
  county: false,
  vacanciesDistrict: false,
  vacanciesAddress: false,
  vacanciesSalaryType: false,
  vacanciesTopSalary: false,
  vacanciesDownSalary: false,
  vacanciesDescription: false,
  vacanciesRequirement: false,
  vacanciesQuantity: false,
  vacanciesCondition: false,
  skills: false,
  vacanciesWatchType: false,
};

const EditorMaxLength = 150000; // 給vacancy的description和requirement

const EditJob = ({
  vacancy,
  companyName,
  jobId,
}: {
  vacancy?: Vacancy;
  companyName: string;
  jobId: string;
}) => {
  const pathname = usePathname();
  const companyRegex = /^(.*\/jobs)/;
  // @ts-ignore
  const companyPathname = pathname ? pathname.match(companyRegex)[1] : "";

  const { mutate: PostMutate, isSuccess: isPostSuccess } =
    usePostJob(companyName);

  const { mutate: PutMutate, isSuccess: isPutSuccess } = usePutJob(
    companyName,
    jobId
  );

  const [formData, setFormData] = useState<Vacancy>(
    vacancy ? vacancy : initialVacancy
  );
  const [techs, setTechs] = useState([{ skillId: 1, skillName: "React" }]); // !測試獨立useState
  const [errors, setErrors] = useState(initialErrors);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSkillChange = (skillArray: Skill[]) => {
    setFormData({
      ...formData,
      skills: skillArray,
    });
  };

  const handleSubmit = () => {
    let errorsObj = { ...initialErrors };
    Object.keys(errorsObj).forEach((formDatakey) => {
      let value = formData[formDatakey as keyof typeof formData];

      if (value === null)
        errorsObj[formDatakey as keyof typeof errorsObj] = true;
      else if (typeof value === "string" || typeof value === "number") {
        if (!value) errorsObj[formDatakey as keyof typeof errorsObj] = true;
      } else if (typeof value === "object") {
        if (value.length < 1)
          errorsObj[formDatakey as keyof typeof errorsObj] = true;
      }
    });
    setErrors(errorsObj);

    let hasError = Object.values(errorsObj).some((value) => value === true);
    if (hasError) {
      console.log("有錯誤");
      return;
    }

    vacancy
      ? PutMutate({ companyName, formData, jobId })
      : PostMutate({ companyName, formData });
  };

  const LexicalRegex = /"text":"([^"]*)"/g;

  const {
    vacanciesName,
    vacanciesDepartment,
    vacanciesTime,
    vacanciesWorkExperience,
    vacanciesEducation,
    vacanciesOther, //非必要
    vacanciesSafe,
    county,
    vacanciesDistrict,
    vacanciesAddress,
    vacanciesSalaryType,
    vacanciesTopSalary,
    vacanciesDownSalary,
    vacanciesDescription,
    vacanciesRequirement,
    vacanciesQuantity,
    vacanciesCondition,
    skills,
    vacanciesWatchType,
  } = formData;

  return (
    <div className="p-5 flex flex-col gap-3">
      {isPostSuccess ? (
        <SnackBar information="成功新增職缺！" type="success" />
      ) : null}
      {isPutSuccess ? (
        <SnackBar information="成功修改職缺！" type="success" />
      ) : null}

      <div className="mb-1">基本資訊</div>
      <div>
        <div className="text-sm flex gap-1">
          職務名稱 <div className="text-xs text-red-500">*</div>
        </div>
        <div>
          <OutlinedInput
            fullWidth
            size="small"
            error={errors.vacanciesName}
            value={vacanciesName}
            name="vacanciesName"
            onChange={handleTextChange}
          />
        </div>
      </div>
      <div>
        <div className="text-sm flex gap-1">
          職務部門 <div className="text-xs text-red-500">*</div>
        </div>
        <div>
          <OutlinedInput
            fullWidth
            size="small"
            error={errors.vacanciesDepartment}
            value={vacanciesDepartment}
            name="vacanciesDepartment"
            onChange={handleTextChange}
          />
        </div>
      </div>
      <div>
        <div className="text-sm flex gap-1">
          工作時間 <div className="text-xs text-red-500">*</div>
        </div>
        <div>
          <OutlinedInput
            fullWidth
            size="small"
            error={errors.vacanciesTime}
            value={vacanciesTime}
            name="vacanciesTime"
            onChange={handleTextChange}
            placeholder="每星期至少三天.."
          />
        </div>
      </div>
      <div>
        <div className="text-sm flex gap-1">
          薪資 <div className="text-xs text-red-500">*</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            從
            <OutlinedInput
              type="number"
              inputProps={{ min: 0 }}
              fullWidth
              size="small"
              error={errors.vacanciesDownSalary}
              value={vacanciesDownSalary || ""}
              name="vacanciesDownSalary"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  vacanciesDownSalary: e.target.value
                    ? parseInt(e.target.value)
                    : 0,
                })
              }
            />
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            到
            <OutlinedInput
              type="number"
              inputProps={{ min: 0, max: 10000000 }}
              fullWidth
              size="small"
              error={errors.vacanciesTopSalary}
              value={vacanciesTopSalary || ""}
              name="vacanciesTopSalary"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  vacanciesTopSalary: e.target.value
                    ? parseInt(e.target.value)
                    : 0,
                })
              }
            />
          </div>
          <FormControl size="small">
            <InputLabel id="demo-select-small">薪資類型</InputLabel>
            <Select
              value={vacanciesSalaryType}
              label="薪資類型"
              error={errors.vacanciesSalaryType}
              onChange={(e: SelectChangeEvent) => {
                setFormData({
                  ...formData,
                  vacanciesSalaryType: e.target.value as "hour" | "month",
                });
              }}
            >
              <MenuItem value={"hour"}>時薪</MenuItem>
              <MenuItem value={"month"}>月薪</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel id="demo-select-small">幣別</InputLabel>
            <Select
              value={"TWD"}
              label="幣別"
              // onChange={(e: SelectChangeEvent) => {}}
            >
              <MenuItem value={"TWD"}>台幣</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        <div className="text-sm flex gap-1">
          教育程度 <div className="text-xs text-red-500">*</div>
        </div>
        <div>
          <FormControl size="small" fullWidth>
            <Select
              value={vacanciesEducation || "博士以上"}
              error={errors.vacanciesEducation}
              onChange={(e: SelectChangeEvent) => {
                setFormData({
                  ...formData,
                  vacanciesEducation: e.target.value,
                });
              }}
              displayEmpty
            >
              <MenuItem value={"博士以上"}>博士</MenuItem>
              <MenuItem value={"碩士以上"}>碩士</MenuItem>
              <MenuItem value={"大學以上"}>大學</MenuItem>
              <MenuItem value={"四技以上"}>四技</MenuItem>
              <MenuItem value={"二技以上"}>二技</MenuItem>
              <MenuItem value={"二專以上"}>二專</MenuItem>
              <MenuItem value={"三專以上"}>三專</MenuItem>
              <MenuItem value={"五專以上"}>五專</MenuItem>
              <MenuItem value={"高中以上"}>高中</MenuItem>
              <MenuItem value={"高職以上"}>高職</MenuItem>
              <MenuItem value={"國中(含)以下"}>國中(含)以下</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        <div className="text-sm flex gap-1">
          需求人數 <div className="text-xs text-red-500">*</div>
        </div>
        <div>
          <OutlinedInput
            type="number"
            inputProps={{ min: 1 }}
            fullWidth
            error={errors.vacanciesQuantity}
            size="small"
            value={vacanciesQuantity ? vacanciesQuantity : 1}
            name="vacanciesQuantity"
            onChange={(e) =>
              setFormData({
                ...formData,
                vacanciesQuantity: e.target.value
                  ? parseInt(e.target.value)
                  : 1,
              })
            }
          />
        </div>
      </div>
      <div>
        <div className="text-sm flex gap-1">
          工作地點 <div className="text-xs text-red-500">*</div>
        </div>
        <div className="w-full mt-3">
          <Grid container spacing={1} className="justify-center">
            <AddressPicker
              errors={{
                county: errors.county,
                district: errors.vacanciesDistrict,
                address: errors.vacanciesAddress,
              }}
              county={county as keyof typeof TaiwanPostalCode}
              district={vacanciesDistrict}
              address={vacanciesAddress}
              handleSelectChange={(e) => {
                if (e.target.name === "companyCounty")
                  setFormData({
                    ...formData,
                    county: e.target.value,
                    vacanciesDistrict: "",
                  });
                else if (e.target.name === "companyDistrict")
                  setFormData({
                    ...formData,
                    vacanciesDistrict: e.target.value,
                  });
              }}
              handleTextChange={(e) => {
                setFormData({ ...formData, vacanciesAddress: e.target.value });
              }}
            />
          </Grid>
        </div>
      </div>
      <div>
        <div className="text-sm flex gap-1">
          工作經歷 <div className="text-xs text-red-500">*</div>
        </div>
        <div>
          <OutlinedInput
            type="number"
            inputProps={{ min: 0 }}
            fullWidth
            size="small"
            error={errors.vacanciesWorkExperience}
            value={
              vacanciesWorkExperience
                ? vacanciesWorkExperience === "不限年資"
                  ? 0
                  : vacanciesWorkExperience.split(" ")[1]
                : ""
            }
            placeholder="需具備幾年工作經驗？"
            name="vacanciesWorkExperience"
            onChange={(e) => {
              setFormData({
                ...formData,
                vacanciesWorkExperience: e.target.value
                  ? parseInt(e.target.value) === 0
                    ? "不限年資"
                    : `需具備 ${e.target.value} 年以上工作經驗`
                  : "",
              });
            }}
          />
        </div>
        <div className="text-xs text-slate-500 mt-1">
          若不限年資（無經驗也可以應徵）請填寫 0。
        </div>
      </div>
      <div>
        <div className="text-sm flex gap-1">
          技能 <div className="text-xs text-red-500">*</div>
        </div>
        <div>
          <SkillPicker
            error={errors.skills}
            techs={skills} //skills
            handleSkillChange={handleSkillChange}
          />
        </div>
      </div>
      <div>
        <div className="text-sm flex gap-1">
          職缺描述 <div className="text-xs text-red-500">*</div>
        </div>
        <div
          className={`border-solid border rounded ${
            vacanciesDescription.length > EditorMaxLength ||
            errors.vacanciesDescription
              ? "border-red-300"
              : "border-gray-300"
          }`}
        >
          <Lexical
            value={
              vacanciesDescription
                ? vacanciesDescription.match(LexicalRegex)
                  ? vacanciesDescription
                  : initialJsonString
                : initialJsonString
            }
            onChange={(editorState: EditorState, editor: LexicalEditor) => {
              setFormData({
                ...formData,
                vacanciesDescription: JSON.stringify(editorState),
              });
            }}
            editable={true}
          />
          <div
            className={`${
              vacanciesDescription.length > EditorMaxLength ? "block" : "hidden"
            } text-center text-red-500`}
          >
            內容過長，請做修剪
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm flex gap-1">
          職務需求 <div className="text-xs text-red-500">*</div>
        </div>
        <div
          className={`border-solid border rounded ${
            vacanciesRequirement.length > EditorMaxLength ||
            errors.vacanciesRequirement
              ? "border-red-300"
              : "border-gray-300"
          }`}
        >
          <Lexical
            value={
              vacanciesRequirement
                ? vacanciesRequirement.match(LexicalRegex)
                  ? vacanciesRequirement
                  : initialJsonString
                : initialJsonString
            }
            onChange={(editorState: EditorState, editor: LexicalEditor) => {
              setFormData({
                ...formData,
                vacanciesRequirement: JSON.stringify(editorState),
              });
            }}
            editable={true}
          />
          <div
            className={`${
              vacanciesRequirement.length > EditorMaxLength ? "block" : "hidden"
            } text-center text-red-500`}
          >
            內容過長，請做修剪
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm flex gap-1">
          工作保險 <div className="text-xs text-red-500">*</div>
        </div>
        <div>
          <OutlinedInput
            fullWidth
            size="small"
            error={errors.vacanciesSafe}
            value={vacanciesSafe}
            name="vacanciesSafe"
            onChange={handleTextChange}
          />
        </div>
      </div>
      <div>
        <div className="text-sm flex gap-1">
          面試流程 <div className="text-xs text-red-500">*</div>
        </div>
        <div>
          <OutlinedInput
            fullWidth
            size="small"
            error={errors.vacanciesCondition}
            value={vacanciesCondition}
            name="vacanciesCondition"
            onChange={handleTextChange}
          />
        </div>
      </div>
      <div>
        <div className="text-sm flex gap-1">其他事項</div>
        <div>
          <OutlinedInput
            fullWidth
            size="small"
            value={vacanciesOther}
            name="vacanciesOther"
            onChange={handleTextChange}
          />
        </div>
      </div>
      <div>
        <div className="text-sm flex gap-1">
          職缺狀態 <div className="text-xs text-red-500">*</div>
        </div>
        <div>
          <FormControl size="small" fullWidth>
            <Select
              value={vacanciesWatchType || "公開"}
              onChange={(e: SelectChangeEvent) => {
                setFormData({
                  ...formData,
                  vacanciesWatchType: e.target.value as
                    | "公開"
                    | "隱藏"
                    | "暫停",
                });
              }}
              displayEmpty
            >
              <MenuItem value={"公開"}>公開</MenuItem>
              <MenuItem value={"隱藏"}>
                隱藏（在搜尋頁面不會被搜尋到，有連結的話還是能應徵）
              </MenuItem>
              <MenuItem value={"暫停"}>暫停（無法被應徵）</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Link href={companyPathname}>
          <MyButton classnames="">取消</MyButton>
        </Link>

        <MyButton
          classnames="text-white bg-blue-400 hover:bg-blue-500"
          onClick={handleSubmit}
          // disabled={!isFormDataCorrect}
        >
          確認
        </MyButton>
      </div>
    </div>
  );
};

export default EditJob;
