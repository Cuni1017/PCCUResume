"use client";

import React, { useRef, useState } from "react";
import MyDialog from "./MyDialog";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import MyButton from "./MyButton";
import CloseIcon from "@mui/icons-material/Close";

function ArrayToFileList(files: File[]): FileList {
  const dataTransfer = new DataTransfer();
  for (let i = 0; i < files.length; i++) {
    dataTransfer.items.add(files[i]);
  }
  return dataTransfer.files;
}

const FileUploader = ({
  isOpen,
  onClose,
  onUpload,
  multiple,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File | FileList) => void;
  multiple?: boolean; // 是否可上傳多個檔案
}) => {
  const [file, setFile] = useState<File | FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    if (multiple) {
      let newFileArray;
      newFileArray = file instanceof FileList ? Array.from(file) : new Array();
      if (e.target.files.length > 1) {
        for (const f of e.target.files) {
          newFileArray.push(f);
        }
      } else {
        newFileArray.push(e.target.files[0]);
      }
      if (newFileArray) setFile(ArrayToFileList(newFileArray));
    } else {
      setFile(e.target.files[0]);
    }
  }

  function onDropFile(e: any) {
    e.preventDefault();
    if (!e.dataTransfer.files) return;

    if (multiple) {
      let newFileArray;
      newFileArray = file instanceof FileList ? Array.from(file) : new Array();
      if (e.dataTransfer.files.length > 1) {
        for (const f of e.dataTransfer.files) {
          newFileArray.push(f);
        }
      } else {
        newFileArray.push(e.dataTransfer.files[0]);
      }
      if (newFileArray) setFile(ArrayToFileList(newFileArray));
    } else {
      setFile(e.dataTransfer.files[0]);
    }
  }

  function onUploadBtnClick() {
    if (!file) return;
    onUpload(file);
  }

  const renderedFiles = () => {
    if (file instanceof File)
      return (
        <div className="rounded flex items-center justify-between">
          <div
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={onDropFile}
            onClick={() => {
              if (inputRef.current) inputRef.current.click();
            }}
            className="p-4 grow cursor-pointer hover:bg-gray-200 text-blue-500 "
          >
            {file.name}
          </div>
          <div
            className="hover:bg-gray-200 cursor-pointer flex items-center justify-center"
            onClick={() => {
              if (inputRef.current) inputRef.current.value = "";
              setFile(null);
            }}
          >
            <CloseIcon color="error" />
          </div>
        </div>
      );
    if (file instanceof FileList) {
      return Array.from(file).map((f, index) => (
        <div key={f.name} className="rounded flex items-center justify-between">
          <div
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={onDropFile}
            onClick={() => {
              if (inputRef.current) inputRef.current.click();
            }}
            className="p-4 grow cursor-pointer hover:bg-gray-200 text-blue-500 "
          >
            {f.name}
          </div>
          <div
            className="hover:bg-gray-200 cursor-pointer flex items-center justify-center"
            onClick={() => {
              const newFileArray = Array.from(file);
              newFileArray.splice(index, 1);
              newFileArray.length === 0
                ? setFile(null)
                : setFile(ArrayToFileList(newFileArray));
            }}
          >
            <CloseIcon color="error" />
          </div>
        </div>
      ));
    }
  };

  return (
    <MyDialog isOpen={isOpen} onClose={onClose} maxWidth="lg">
      <div className="rounded w-full">
        <div className="text-lg px-6 py-3">上傳檔案</div>
        <hr className="w-full m-0 p-0" />
        <div className="p-6 md:w-[40rem]">
          <input
            multiple={multiple} //目前後端不支援上傳多個檔案
            type="file"
            ref={inputRef}
            onChange={onSelectFile}
            style={{ display: "none" }}
            accept=".pptx, .pdf, .rar, .zip, .doc, image/png, image/jpeg"
          />

          {!!file ? <>{renderedFiles()}</> : null}

          {(!file || multiple) && (
            <>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={onDropFile}
                onClick={() => {
                  if (inputRef.current) inputRef.current.click();
                }}
                className="my-3 p-10 h-[3rem] bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center flex-col"
              >
                <div>
                  <FileUploadIcon />
                </div>
                <div>將檔案拖拉到這裡或選擇檔案。</div>
              </div>
            </>
          )}

          {!!file && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <MyButton
                classnames="text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                onClick={onUploadBtnClick}
              >
                上傳
              </MyButton>
              <MyButton
                classnames="hover:bg-gray-300"
                onClick={() => {
                  setFile(null);
                  onClose();
                }}
              >
                取消
              </MyButton>
            </div>
          )}
        </div>
      </div>
    </MyDialog>
  );
};

export default FileUploader;
