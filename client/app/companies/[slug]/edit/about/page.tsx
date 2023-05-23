"use client";

import React, { useEffect, useState } from "react";
import MyButton from "@/app/components/MyButton";
import Lexical, { initialJsonString } from "@/app/components/Lexical/App";
import { EditorState } from "lexical/LexicalEditorState";
import { LexicalEditor } from "lexical/LexicalEditor";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  useGetCompanyAbout,
  usePostCompanyAbout,
  usePutCompanyAbout,
} from "@/hooks/useCompanyAbout";
import SnackBar from "@/app/components/SnackBar";

const EditorMaxLength = 150000; // 給Lexical
const LexicalRegex = /"text":"([^"]*)"/g;

const CompanyEditAboutPage = (props: any) => {
  const {
    params: { slug },
  } = props;
  const [isUseEffectUpdated, setIsUseEffectUpdated] = useState(false);
  const [companyAboutInfo, setCompanyAboutInfo] = useState({
    companyAboutService: "", //產品或服務
    companyAboutMission: "", //使命
    companyAboutMedia: "", //媒體曝光
    companyTwitterUrl: "",
    companyFacebookUrl: "",
    companyInstagramUrl: "",
    companyId: "",
  });

  const { data } = useGetCompanyAbout({ companyName: slug, type: "service" });
  const { mutate: PostMutate, isSuccess: isPostSuccess } = usePostCompanyAbout({
    companyName: slug,
    type: "service",
  });
  const { mutate: PutMutate, isSuccess: isPutSuccess } = usePutCompanyAbout({
    companyName: slug,
    type: "service",
  });

  useEffect(() => {
    if (data.hasOwnProperty("companyId")) {
      setCompanyAboutInfo({ ...companyAboutInfo, ...data });
      setIsUseEffectUpdated(true);
    }
  }, [data]);

  const {
    companyAboutService,
    companyAboutMission,
    companyAboutMedia,
    companyTwitterUrl,
    companyFacebookUrl,
    companyInstagramUrl,
    companyId,
  } = companyAboutInfo;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyAboutInfo({
      ...companyAboutInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    companyId
      ? PutMutate({
          companyName: slug,
          type: "service",
          formData: companyAboutInfo,
        })
      : PostMutate({
          companyName: slug,
          type: "service",
          formData: companyAboutInfo,
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
        <div>關於公司</div>
        <div className="text-slate-500 text-sm">
          介紹公司的產品或服務，幫助求職者更快認識您的公司。（如果有不同語言的介紹，建議可以都附上。）
        </div>
      </div>

      <div className="flex flex-col gap-3 my-4">
        <div className="flex flex-col gap-1">
          <div className="text-sm text-gray-500 flex gap-1">產品或服務</div>
          <div
            className={`border-solid border rounded ${
              companyAboutService?.length > EditorMaxLength
                ? // || errors.companyAboutService
                  "border-red-300"
                : "border-gray-300"
            }`}
          >
            {isUseEffectUpdated && (
              <Lexical
                value={
                  companyAboutService
                    ? companyAboutService.match(LexicalRegex)
                      ? companyAboutService
                      : initialJsonString
                    : initialJsonString
                }
                onChange={(editorState: EditorState, editor: LexicalEditor) => {
                  setCompanyAboutInfo({
                    ...companyAboutInfo,
                    companyAboutService: JSON.stringify(editorState),
                  });
                }}
                editable={true}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-sm text-gray-500 flex gap-1">使命</div>
          <div
            className={`border-solid border rounded ${
              companyAboutMission?.length > EditorMaxLength
                ? // || errors.companyAboutMission
                  "border-red-300"
                : "border-gray-300"
            }`}
          >
            {isUseEffectUpdated && (
              <Lexical
                value={
                  companyAboutMission
                    ? companyAboutMission.match(LexicalRegex)
                      ? companyAboutMission
                      : initialJsonString
                    : initialJsonString
                }
                onChange={(editorState: EditorState, editor: LexicalEditor) => {
                  setCompanyAboutInfo({
                    ...companyAboutInfo,
                    companyAboutMission: JSON.stringify(editorState),
                  });
                }}
                editable={true}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-sm text-gray-500 flex gap-1">媒體曝光</div>
          <div
            className={`border-solid border rounded ${
              companyAboutMedia?.length > EditorMaxLength
                ? // || errors.companyAboutMedia
                  "border-red-300"
                : "border-gray-300"
            }`}
          >
            {isUseEffectUpdated && (
              <Lexical
                value={
                  companyAboutMedia
                    ? companyAboutMedia.match(LexicalRegex)
                      ? companyAboutMedia
                      : initialJsonString
                    : initialJsonString
                }
                onChange={(editorState: EditorState, editor: LexicalEditor) => {
                  setCompanyAboutInfo({
                    ...companyAboutInfo,
                    companyAboutMedia: JSON.stringify(editorState),
                  });
                }}
                editable={true}
              />
            )}
          </div>
        </div>

        <label className="flex flex-col gap-1">
          <div className="text-sm text-gray-500 flex gap-1">Twitter handle</div>
          <div>
            <OutlinedInput
              fullWidth
              size="small"
              // error={errors.}
              value={companyTwitterUrl || ""}
              placeholder="@MyTwitterHandle"
              name="companyTwitterUrl"
              onChange={handleTextChange}
            />
          </div>
        </label>
        <label className="flex flex-col gap-1">
          <div className="text-sm text-gray-500 flex gap-1">Facebook 網址</div>
          <div>
            <OutlinedInput
              fullWidth
              size="small"
              // error={errors.}
              value={companyFacebookUrl || ""}
              placeholder="https://www.facebook.com/..."
              name="companyFacebookUrl"
              onChange={handleTextChange}
            />
          </div>
        </label>
        <label className="flex flex-col gap-1">
          <div className="text-sm text-gray-500 flex gap-1">Instagram 網址</div>
          <div>
            <OutlinedInput
              fullWidth
              size="small"
              // error={errors.companyInstagramUrl}
              value={companyInstagramUrl || ""}
              placeholder="https://www.instagram.com/..."
              name="companyInstagramUrl"
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

export default CompanyEditAboutPage;
