"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import MyButton from "@/app/components/MyButton";
import Lexical, { initialJsonString } from "@/app/components/Lexical/App";
import { EditorState } from "lexical/LexicalEditorState";
import { LexicalEditor } from "lexical/LexicalEditor";
import { Company } from "../applicants/page";
import {
  useGetCompanyAbout,
  usePostCompanyAbout,
  usePutCompanyAbout,
} from "@/hooks/useCompanyAbout";
import SnackBar from "@/app/components/SnackBar";

interface CompanyAboutBasic {
  companyId: string;
  companyAboutUrl: string | null;
  companyAboutEmployeeQuantity: string | null;
  companyAboutHaveMoney: number;
  companyAboutBackgroundImageUrl: string | null;
  companyAboutTalk: string | null;
  companyAboutContactPerson: string | null;
  companyAboutLogoImageUrl: string | null;
  companyAboutEnvironment: string | null;
  companyAboutLogoSavePath: string | null;
  companyAboutBackgroundSavePath: string | null;
  // companyAboutService: companyAboutService | null;
  // companyAboutWelfare: companyAboutWelfare | null;
  company: Company | null;
}

interface companyAboutService {
  companyId: string;
  companyAboutService: string | null;
  companyAboutMission: string | null;
  companyAboutMedia: string | null;
  companyTwitterUrl: string | null;
  companyFacebookUrl: string | null;
  companyInstagramUrl: string | null;
}

interface companyAboutWelfare {
  companyId: string;
  companyAboutWelfare: string | null;
}

const EditorMaxLength = 150000; // 給Lexical
const LexicalRegex = /"text":"([^"]*)"/g;

const CompanyEditPage = (props: any) => {
  const {
    params: { slug },
  } = props;
  const [isUseEffectUpdated, setIsUseEffectUpdated] = useState(false);
  const { data } = useGetCompanyAbout({
    companyName: slug,
    type: "basic",
  });
  const [companyBasicInfo, setCompanyBasicInfo] = useState({
    companyName: "",
    companyNumber: "",
    companyAboutUrl: "", //公司網站
    companyAboutEmployeeQuantity: "", //員工人數
    companyAboutHaveMoney: "", //資本額
    companyAboutTalk: "", //公司介紹
    companyAboutContactPerson: "", //聯絡人姓名
    companyAboutContactNumber: "", //聯絡人電話
    companyAboutEnvironment: "", //環境
    companyAboutBasic: "",
  });

  const { mutate: PostMutate, isSuccess: isPostSuccess } = usePostCompanyAbout({
    companyName: slug,
    type: "basic",
  });
  const { mutate: PutMutate, isSuccess: isPutSuccess } = usePutCompanyAbout({
    companyName: slug,
    type: "basic",
  });

  useEffect(() => {
    if (data.companyId) {
      setCompanyBasicInfo({
        ...companyBasicInfo,
        ...data.companyAboutBasic,
        companyName: data.companyName || "",
        companyNumber: data.companyNumber || "",
      });
      setIsUseEffectUpdated(true);
    }
  }, [data]);

  const {
    companyName,
    companyNumber,
    companyAboutUrl,
    companyAboutEmployeeQuantity,
    companyAboutHaveMoney,
    companyAboutTalk,
    companyAboutContactPerson,
    companyAboutContactNumber,
    companyAboutEnvironment,
    companyAboutBasic,
  } = companyBasicInfo;

  const handleSave = () => {
    companyAboutBasic
      ? PutMutate({
          companyName: slug,
          type: "basic",
          formData: companyBasicInfo,
        })
      : PostMutate({
          companyName: slug,
          type: "basic",
          formData: companyBasicInfo,
        });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyBasicInfo({
      ...companyBasicInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {isPostSuccess ? (
        <SnackBar information="成功修改公司資訊！" type="success" />
      ) : null}
      {isPutSuccess ? (
        <SnackBar information="成功修改公司資訊！" type="success" />
      ) : null}
      <div className="flex flex-col gap-2">
        <div>基本資訊</div>
        <div className="text-slate-500 text-sm">
          填寫公司基本資訊，建立公司徵才頁面。
        </div>
      </div>
      <div className="flex flex-col gap-3 my-4">
        <label className="flex flex-col gap-1">
          <div className="text-sm text-gray-500 flex gap-1">
            公司名稱 <div className="text-xs text-red-500">*</div>
          </div>
          <div>
            <OutlinedInput
              fullWidth
              size="small"
              // error={errors.}
              value={companyName}
              name="companyName"
              onChange={handleTextChange}
            />
          </div>
        </label>
        <label className="flex flex-col gap-1">
          <div className="text-sm text-gray-500 flex gap-1">
            公司電話 <div className="text-xs text-red-500">*</div>
          </div>
          <div>
            <OutlinedInput
              fullWidth
              size="small"
              // error={errors.}
              value={companyNumber}
              name="companyNumber"
              onChange={handleTextChange}
            />
          </div>
        </label>
        <label className="flex flex-col gap-1">
          <div className="text-sm text-gray-500 flex gap-1">網站</div>
          <div>
            <OutlinedInput
              fullWidth
              size="small"
              // error={errors.}
              placeholder="https://www.example.com"
              value={companyAboutUrl || ""}
              name="companyAboutUrl"
              onChange={handleTextChange}
            />
          </div>
        </label>
        <label className="flex flex-col gap-1">
          <div className="text-sm text-gray-500 flex gap-1">
            員工人數 <div className="text-xs text-red-500">*</div>
          </div>
          <div>
            <FormControl size="small" fullWidth>
              <Select
                value={companyAboutEmployeeQuantity || "1～10人"}
                // error={errors.companyAboutEmployeeQuantity}
                onChange={(e: SelectChangeEvent) => {
                  setCompanyBasicInfo({
                    ...companyBasicInfo,
                    companyAboutEmployeeQuantity: e.target.value,
                  });
                }}
                displayEmpty
              >
                <MenuItem value={"1～10人"}>1～10人</MenuItem>
                <MenuItem value={"11～50人"}>11～50人</MenuItem>
                <MenuItem value={"51～200人"}>51～200人</MenuItem>
                <MenuItem value={"201～500人"}>201～500人</MenuItem>
                <MenuItem value={"501～1000人"}>501～1000人</MenuItem>
                <MenuItem value={"1001～5000人"}>1001～5000人</MenuItem>
                <MenuItem value={"5000人以上"}>5000人以上</MenuItem>
              </Select>
            </FormControl>
          </div>
        </label>
        <label className="flex flex-col gap-1">
          <div className="text-sm text-gray-500 flex gap-1">
            資本額 <div className="text-xs text-red-500">*</div>
          </div>
          <div>
            <OutlinedInput
              fullWidth
              size="small"
              // error={errors.}
              value={companyAboutHaveMoney}
              name="companyAboutHaveMoney"
              type="number"
              onChange={handleTextChange}
              endAdornment={<div className="px-2">萬</div>}
            />
          </div>
        </label>

        <div className="flex flex-col gap-1">
          <div className="text-sm text-gray-500 flex gap-1">
            公司介紹 <div className="text-xs text-red-500">*</div>
          </div>
          <div
            className={`border-solid border rounded ${
              companyAboutTalk?.length > EditorMaxLength
                ? // || errors.companyAboutTalk
                  "border-red-300"
                : "border-gray-300"
            }`}
          >
            {isUseEffectUpdated && (
              <Lexical
                value={
                  companyAboutTalk && companyAboutTalk.match(LexicalRegex)
                    ? companyAboutTalk
                    : initialJsonString
                  // '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"b","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
                }
                onChange={(editorState: EditorState, editor: LexicalEditor) => {
                  setCompanyBasicInfo({
                    ...companyBasicInfo,
                    companyAboutTalk: JSON.stringify(editorState),
                  });
                }}
                editable={true}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-sm text-gray-500 flex gap-1">
            公司環境 <div className="text-xs text-red-500">*</div>
          </div>
          <div
            className={`border-solid border rounded ${
              companyAboutEnvironment?.length > EditorMaxLength
                ? // || errors.companyAboutTalk
                  "border-red-300"
                : "border-gray-300"
            }`}
          >
            {isUseEffectUpdated && (
              <Lexical
                value={
                  companyAboutEnvironment &&
                  companyAboutEnvironment.match(LexicalRegex)
                    ? companyAboutEnvironment
                    : initialJsonString
                }
                onChange={(editorState: EditorState, editor: LexicalEditor) => {
                  setCompanyBasicInfo({
                    ...companyBasicInfo,
                    companyAboutEnvironment: JSON.stringify(editorState),
                  });
                }}
                editable={true}
              />
            )}
          </div>
        </div>

        <label className="flex flex-col gap-1">
          <div className="text-sm text-gray-500 flex gap-1">
            聯絡人姓名 <div className="text-xs text-red-500">*</div>
          </div>
          <div>
            <OutlinedInput
              fullWidth
              size="small"
              // error={errors.}
              value={companyAboutContactPerson}
              name="companyAboutContactPerson"
              onChange={handleTextChange}
            />
          </div>
        </label>
        <label className="flex flex-col gap-1">
          <div className="text-sm text-gray-500 flex gap-1">
            聯絡人電話 <div className="text-xs text-red-500">*</div>
          </div>
          <div>
            <OutlinedInput
              fullWidth
              size="small"
              // error={errors.}
              value={companyAboutContactNumber}
              name="companyAboutContactNumber"
              onChange={handleTextChange}
            />
          </div>
        </label>
      </div>
      <div className="mt-5">
        <MyButton
          onClick={handleSave}
          classnames="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          儲存
        </MyButton>
      </div>
    </>
  );
};

export default CompanyEditPage;
