"use client";

import React, { useEffect, useState } from "react";
import MyButton from "@/app/components/MyButton";
import Lexical, { initialJsonString } from "@/app/components/Lexical/App";
import { EditorState } from "lexical/LexicalEditorState";
import { LexicalEditor } from "lexical/LexicalEditor";
import {
  useGetCompanyAbout,
  usePostCompanyAbout,
  usePutCompanyAbout,
} from "@/hooks/useCompanyAbout";
import SnackBar from "@/app/components/SnackBar";

const EditorMaxLength = 150000; // 給Lexical
const LexicalRegex = /"text":"([^"]*)"/g;

const CompanyEditBenefitPage = (props: any) => {
  const {
    params: { slug },
  } = props;
  const [isUseEffectUpdated, setIsUseEffectUpdated] = useState(false);
  const [companyWelfareInfo, setCompanyWelfareInfo] = useState({
    companyAboutWelfare: "",
    companyId: "",
  }); //員工福利

  const { companyId, companyAboutWelfare } = companyWelfareInfo;

  const { data } = useGetCompanyAbout({ companyName: slug, type: "welfare" });
  const { mutate: PostMutate, isSuccess: isPostSuccess } = usePostCompanyAbout({
    companyName: slug,
    type: "welfare",
  });
  const { mutate: PutMutate, isSuccess: isPutSuccess } = usePutCompanyAbout({
    companyName: slug,
    type: "welfare",
  });

  useEffect(() => {
    if (data.hasOwnProperty("companyId")) {
      setCompanyWelfareInfo(data);
      setIsUseEffectUpdated(true);
    }
  }, [data]);

  const handleSave = () => {
    companyId
      ? PutMutate({
          companyName: slug,
          type: "welfare",
          formData: companyWelfareInfo,
        })
      : PostMutate({
          companyName: slug,
          type: "welfare",
          formData: companyWelfareInfo,
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
        <div>員工福利</div>
        <div className="text-slate-500 text-sm">
          清楚的員工福利描述有助於吸引潛在求職者投遞履歷。
        </div>
      </div>

      {isUseEffectUpdated ? (
        <div className="flex flex-col gap-3 my-4">
          <div className="flex flex-col gap-1">
            <div className="text-sm text-gray-500 flex gap-1">員工福利</div>
            <div
              className={`border-solid border rounded ${
                companyAboutWelfare?.length > EditorMaxLength
                  ? // || errors.companyAboutTalk
                    "border-red-300"
                  : "border-gray-300"
              }`}
            >
              <Lexical
                value={
                  companyAboutWelfare
                    ? companyAboutWelfare.match(LexicalRegex)
                      ? companyAboutWelfare
                      : initialJsonString
                    : initialJsonString
                }
                onChange={(editorState: EditorState, editor: LexicalEditor) => {
                  setCompanyWelfareInfo({
                    ...companyWelfareInfo,
                    companyAboutWelfare: JSON.stringify(editorState),
                  });
                }}
                editable={true}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
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

export default CompanyEditBenefitPage;
