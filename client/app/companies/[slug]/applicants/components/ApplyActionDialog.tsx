import React, { useState } from "react";
import MyButton from "@/app/components/MyButton";
import MyDialog from "@/app/components/MyDialog";
import { ApplyUser } from "../page";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  onSubmit: ({
    applyId,
    applyType,
  }: {
    applyId: string;
    applyType: ApplyType;
  }) => void;
  onClose: () => void;
  applyUser: ApplyUser | null;
}

const applyActions = {
  拒絕應徵: { description: "拒絕該學生應徵此職缺。", outcome: "應徵失敗" },
  接受應徵: {
    description:
      "學生將進到面試中的分類，並且平台將自動發送履歷至該學生信箱通知通過審核，在此動作後，請再自行與學生溝通面試時間及流程等詳細資訊。",
    outcome: "面試中",
  },
  面試通過: {
    description: "直接確認學生通過面試，平台將發送應徵確認給學生。",
    outcome: "待學生同意中",
  },
  面試拒絕: { description: "該學生在面試中被拒。", outcome: "面試失敗" },
  中斷實習: { description: "中斷該學生的實習", outcome: "實習中斷" },
  延長實習: { description: "延長該學生的實習時間", outcome: "實習中" },
};

export type ApplyType =
  | "應徵中"
  | "面試中"
  | "待學生同意中"
  | "實習中"
  | "應徵失敗"
  | "面試失敗"
  | "待學生同意中失敗";
export type ApplyAction = keyof typeof applyActions;

const ApplyActionDialog = ({ onSubmit, onClose, applyUser }: Props) => {
  const [isShowHeadshot, setIsShowHeadShot] = useState(false);
  const [showDoubleCheckDialog, setShowDoubleCheckDialog] =
    useState<ApplyAction | null>(null);

  if (!applyUser) return <></>;
  const {
    applyId,
    applyType,
    companyId,
    studentImageUrl,
    applyBeforeTalk,
    createTime,
    resumeId,
    studentEmail,
    studentRealName,
    studentUsername,
    applyEmail,
    applyNumber,
    userId,
    vacanciesId,
  } = applyUser;

  // let studentImageUrl =
  //   "https://plus.unsplash.com/premium_photo-1667030489905-d8e6309ebe0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";

  const handleClick = (applyAction: ApplyAction) => {
    setShowDoubleCheckDialog(applyAction);
  };

  return (
    <MyDialog isOpen={!!applyUser} onClose={onClose}>
      <DoubleCheckDialog
        isOpen={!!showDoubleCheckDialog}
        onSure={() =>
          onSubmit({
            applyId,
            applyType: applyActions[showDoubleCheckDialog as ApplyAction]
              .outcome as ApplyType,
          })
        }
        onClose={() => setShowDoubleCheckDialog(null)}
        title={showDoubleCheckDialog as string}
        content={
          showDoubleCheckDialog
            ? applyActions[showDoubleCheckDialog].description
            : ""
        }
      />
      {studentImageUrl && (
        <ImageDialog
          imageURL={studentImageUrl}
          isOpen={isShowHeadshot}
          onClose={() => setIsShowHeadShot(false)}
        />
      )}
      <div className="absolute right-2 top-2">
        <button
          onClick={onClose}
          className="bg-inherit border-0 flex items-center justify-center p-1 cursor-pointer hover:bg-gray-200"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="flex flex-col gap-5 p-5 max-w-[20rem] sm:max-w-none sm:w-[30rem]">
        <div className="flex gap-2">
          <div onClick={() => setIsShowHeadShot(true)}>
            <Avatar
              className={`${studentImageUrl ? "cursor-pointer" : ""}`}
              alt={studentRealName}
              src={studentImageUrl ? studentImageUrl : " "}
            />
          </div>
          <Link
            href={`/me/${studentRealName}`}
            className="flex items-center hover:underline"
          >
            <div>{studentRealName}</div>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row md:items-center gap-2">
          <div className="font-bold">電子信箱： </div>
          <div className="flex items-center">{applyEmail}</div>
        </div>
        <div className="flex flex-col sm:flex-row md:items-center gap-2">
          <div className="font-bold">聯絡電話： </div>
          <div className="flex items-center">+886 {applyNumber}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold">求職信：</div>
          <div className="text-sm indent-8 whitespace-pre-wrap">
            {applyBeforeTalk}
          </div>
        </div>

        <div className="flex justify-end">
          <Link href={`/resumes/${resumeId}`} target="_blank">
            <MyButton classnames="hover:bg-gray-300">前往觀看履歷</MyButton>
          </Link>
        </div>

        {applyType === "應徵中" && (
          <div className="flex flex-col sm:grid grid-cols-3 gap-3 justify-around">
            <MyButton
              onClick={() => handleClick("接受應徵")}
              classnames="text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
            >
              邀請面試
            </MyButton>
            <MyButton
              onClick={() => handleClick("面試通過")}
              classnames="text-white bg-amber-500 hover:bg-amber-600 focus:bg-amber-700"
            >
              同意
            </MyButton>
            <MyButton
              onClick={() => handleClick("拒絕應徵")}
              classnames="text-white bg-red-500 hover:bg-red-600 focus:bg-red-700"
            >
              拒絕
            </MyButton>
          </div>
        )}

        {applyType === "面試中" && (
          <div className="flex flex-col sm:grid grid-cols-2 gap-3 justify-around">
            <MyButton
              onClick={() => handleClick("面試通過")}
              classnames="text-white bg-amber-500 hover:bg-amber-600 focus:bg-amber-700"
            >
              接受
            </MyButton>
            <MyButton
              onClick={() => handleClick("面試拒絕")}
              classnames="text-white bg-red-500 hover:bg-red-600 focus:bg-red-700"
            >
              拒絕
            </MyButton>
          </div>
        )}
      </div>
    </MyDialog>
  );
};

const DoubleCheckDialog = ({
  title,
  content,
  isOpen,
  onSure,
  onClose,
}: {
  title: string;
  content: string;
  isOpen: boolean;
  onSure: () => void;
  onClose: () => void;
}) => {
  return (
    <MyDialog isOpen={isOpen} onClose={onClose}>
      <div className="p-5 flex flex-col gap-5 sm:min-w-[15rem]">
        <div className="text-xl text-center font-bold">
          {title}
          <hr className="opacity-[70%] w-full" />
        </div>
        <div className="text-sm indent-8">{content}</div>
        <div className="flex flex-col sm:grid grid-cols-2 gap-3 sm:gap-10">
          <MyButton
            onClick={onSure}
            classnames="text-white bg-green-500 hover:bg-green-600 focus:bg-green-700"
          >
            確認
          </MyButton>
          <MyButton onClick={onClose} classnames="hover:bg-gray-300">
            取消
          </MyButton>
        </div>
      </div>
    </MyDialog>
  );
};

const ImageDialog = ({
  imageURL,
  isOpen,
  onClose,
}: {
  imageURL: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <MyDialog isOpen={isOpen} onClose={onClose}>
      <div className="relative w-[20rem] h-[20rem] md:w-[30rem] md:h-[30rem]">
        <Image src={imageURL} alt="" fill sizes="100%" />
      </div>
    </MyDialog>
  );
};

export default ApplyActionDialog;
