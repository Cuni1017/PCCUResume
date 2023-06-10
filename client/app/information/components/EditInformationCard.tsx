"use client";

import React, { useState } from "react";
import { Information } from "./InformationCard";
import { Button } from "@mui/material";
import MyDialog from "@/app/components/MyDialog";
import TextField from "@mui/material/TextField";
import Lexical, { initialJsonString } from "@/app/components/Lexical/App";
import { LexicalEditor } from "lexical/LexicalEditor";
import { LexicalRegex } from "@/util/getIsFullfillLexicalRegex";
import { EditorState } from "lexical/LexicalEditorState";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileUploader from "@/app/components/FileUploader";
import {
  useDeleteInformationFile,
  usePostInformation,
  usePutInformation,
  usePutInformationFile,
} from "@/hooks/teacher/useInformation";
import { useSelector } from "react-redux";
import { Store } from "@/redux/store";
import SnackBar from "@/app/components/SnackBar";
import CloseIcon from "@mui/icons-material/Close";
import DeleteCheckDialog from "./DeleteCheckDialog";

const EditInformationCard = ({
  isOpen,
  onClose,
  information,
  onUpload,
  createMode,
}: {
  isOpen: boolean;
  onClose: () => void;
  information: Information;
  onUpload: (formData: {
    teacherFileTitle: string;
    teacherFileTalk: string;
    teacherFileType: string;
  }) => void;
  createMode?: boolean;
}) => {
  const {
    teacherFile: {
      teacherFileId,
      teacherFileTitle,
      teacherFileName,
      teacherFileTalk,
      teacherFileType,
      teacherId,
      teacherFilePath,
      teacherFileUrl,
    },
  } = information;

  const [title, setTitle] = useState(createMode ? "" : teacherFileTitle);
  const [content, setContent] = useState(createMode ? "" : teacherFileTalk);
  const [type, setType] = useState(createMode ? "" : teacherFileType);
  const [files, setFiles] = useState<File | FileList | null>(null);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isFileDeleting, setIsFileDeleting] = useState(false);

  const { id, role } = useSelector((store: Store) => store.user);
  const {
    mutate: filePutMutate,
    isSuccess: isFilePutMutateSuccess,
    isError: isFilePutMutateError,
  } = usePutInformationFile({
    fileId: teacherFileId,
  });
  const {
    mutate: fileDeleteMutate,
    isSuccess: isFileDeleteMutateSuccess,
    isError: isFileDeleteMutateError,
  } = useDeleteInformationFile({ fileId: teacherFileId });

  const handleFileUpload = (file: File | FileList) => {
    if (teacherFileId && !createMode) {
      // EditMode
      if (file instanceof FileList) return; // 目前只能傳一個
      const formData = new FormData();
      formData.append("file", file);
      filePutMutate({ teacherId: id, fileId: teacherFileId, formData });
    } else {
      // CreateMode
      setFiles(file); //先存著，等InformationPost之後拿teacherFileId接著put
    }
    setIsFileUploading(false);
  };
  const handleFileDelete = () => {
    if (!teacherFileId) return;
    fileDeleteMutate({ teacherId: id, fileId: teacherFileId });
    setIsFileDeleting(false);
  };

  const handleInformationUpload = () => {
    if (!title || content.length <= initialJsonString.length || !type) {
      alert("不得為空白，請檢查內容。");
      return;
    }
    const formData = {
      teacherFileTitle: title,
      teacherFileTalk: content,
      teacherFileType: type,
    };

    onUpload(formData);
    onClose();
  };

  if (!role.includes("TEACHER")) return null;

  return (
    <>
      {(isFilePutMutateSuccess || isFileDeleteMutateSuccess) && (
        <SnackBar information={"成功處理要求！"} type="success" />
      )}

      {(isFilePutMutateError || isFileDeleteMutateError) && (
        <SnackBar information={"處理要求失敗！"} type="error" />
      )}
      <DeleteCheckDialog
        title="確定刪除附件嗎？"
        isOpen={isFileDeleting}
        onClose={() => setIsFileDeleting(false)}
        onDelete={handleFileDelete}
      />

      <MyDialog
        isOpen={isOpen}
        onClose={onClose}
        style={{ zIndex: "10" }}
        maxWidth="lg"
      >
        <div className="p-4 flex flex-col gap-4">
          <div>
            <div className="select-none font-bold">公告名稱</div>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="small"
              fullWidth
            />
          </div>
          <div>
            <div className="select-none font-bold">公告類型</div>
            <TextField
              value={type}
              onChange={(e) => setType(e.target.value)}
              size="small"
              fullWidth
            />
          </div>
          <div>
            <div className="select-none font-bold">發布內容</div>
            <div className="border border-solid rounded border-gray-300 hover:border-gray-500">
              <Lexical
                value={
                  content
                    ? content.match(LexicalRegex)
                      ? content
                      : initialJsonString
                    : initialJsonString
                }
                onChange={(editorState: EditorState, editor: LexicalEditor) => {
                  setContent(JSON.stringify(editorState));
                }}
                editable={true}
              />
            </div>
          </div>
          <div className="relative">
            {!teacherFileId && (
              <div className="text-slate-500 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                請先建立公告後再上傳附件。
              </div>
            )}

            <div className="flex justify-between pr-4">
              <div className="select-none font-bold">附件</div>
              {teacherFileUrl && (
                <Button
                  variant="contained"
                  color="error"
                  disabled={!teacherFileId}
                  onClick={() => setIsFileDeleting(true)}
                >
                  刪除附件
                </Button>
              )}
            </div>
            <div className="p-4 flex items-center justify-between gap-2">
              {teacherFileUrl && (
                <a
                  className="text-blue-500"
                  href={teacherFileUrl}
                  title={teacherFileName as string}
                  download
                >
                  {teacherFileName}
                </a>
              )}
              <Button
                variant="contained"
                color="info"
                disabled={!teacherFileId}
                onClick={() => setIsFileUploading(true)}
              >
                {teacherFileUrl ? "更改附件" : "上傳附件"}
              </Button>

              <FileUploader
                isOpen={isFileUploading}
                onClose={() => setIsFileUploading(false)}
                onUpload={handleFileUpload}
                // multiple //目前後端只支援傳一個檔案
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleInformationUpload}
            >
              儲存
            </Button>
            <Button onClick={onClose}>取消</Button>
          </div>
        </div>
      </MyDialog>
    </>
  );
};

export default EditInformationCard;
