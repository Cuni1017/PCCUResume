import React, { useState } from "react";
import MyButton from "@/app/components/MyButton";
import MyDialog from "@/app/components/MyDialog";
import { ApplyUser } from "../page";
import Link from "next/link";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import MyDatePicker from "@/app/components/MyDatePicker";
import dayjs, { Dayjs } from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import ApplyCoverLetter from "./ApplyCoverLetter";

const applyActions = {
  拒絕應徵: { description: "拒絕該學生應徵此職缺。", outcome: "應徵失敗" },
  接受應徵: {
    description:
      "學生將進到面試中的分類，並且平台將自動發送Email至該學生信箱通知通過審核，在此動作後，請再自行與學生溝通面試時間及流程等詳細資訊。",
    outcome: "面試中",
  },
  面試通過: {
    description: "直接確認學生通過面試，平台將發送應徵確認給學生。",
    outcome: "待學生同意中",
  },
  面試拒絕: { description: "該學生在面試中被拒。", outcome: "面試失敗" },
  調整實習時間: { description: "調整該學生的實習時間。", outcome: "實習中" },
  中斷實習: { description: "中斷該學生的實習。", outcome: "廠商中斷實習" },
};

export type ApplyType =
  | "應徵中"
  | "面試中"
  | "待學生同意中"
  | "實習中"
  | "應徵失敗"
  | "面試失敗"
  | "待學生同意中失敗"
  | "廠商中斷實習";
// | 廠商超時未處理, 學生超時未處理, 有實習成功其他職缺所以此應徵失敗 (平台處理
export type ApplyAction = keyof typeof applyActions;

interface Props {
  applyUser: ApplyUser | null;
  onSubmit: ({
    applyId,
    applyType,
  }: {
    applyId: string;
    applyType: ApplyType;
  }) => void;
  onEditApplyTime: ({
    applyId,
    applyStartTime,
    applyEndTime,
  }: {
    applyId: string;
    applyStartTime: string;
    applyEndTime: string;
  }) => void;
  onClose: () => void;
}

const ApplyActionDialog = ({
  applyUser,
  onSubmit,
  onEditApplyTime,
  onClose,
}: Props) => {
  const [showDoubleCheckDialog, setShowDoubleCheckDialog] =
    useState<ApplyAction | null>(null);
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

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
    applyStartTime,
    applyEndTime,
    userId,
    vacanciesId,
  } = applyUser;

  const handleClick = (applyAction: ApplyAction) => {
    setShowDoubleCheckDialog(applyAction);
  };

  return (
    <MyDialog isOpen={!!applyUser} onClose={onClose}>
      <DoubleCheckDialog
        isOpen={!!showDoubleCheckDialog}
        onSure={() => {
          if (showDoubleCheckDialog === "調整實習時間") {
            setIsShowDatePicker(true);
            return;
          }
          onSubmit({
            applyId,
            applyType: applyActions[showDoubleCheckDialog as ApplyAction]
              .outcome as ApplyType,
          });
          setShowDoubleCheckDialog(null);
        }}
        onClose={() => setShowDoubleCheckDialog(null)}
        title={showDoubleCheckDialog as string}
        content={
          showDoubleCheckDialog
            ? applyActions[showDoubleCheckDialog].description
            : ""
        }
      />
      {isShowDatePicker ? (
        <DatePickerDialog
          applyStartTime={applyStartTime}
          applyEndTime={applyEndTime}
          isOpen={isShowDatePicker}
          onClose={() => setIsShowDatePicker(false)}
          onSure={(applyStartTime: string, applyEndTime: string) => {
            onEditApplyTime({ applyId, applyStartTime, applyEndTime });
            setIsShowDatePicker(false);
            setShowDoubleCheckDialog(null);
          }}
          title={"調整實習時間"}
        />
      ) : null}
      <div className="absolute right-2 top-2">
        <button
          onClick={onClose}
          className="bg-inherit border-0 flex items-center justify-center p-1 cursor-pointer hover:bg-gray-200"
        >
          <CloseIcon />
        </button>
      </div>

      <ApplyCoverLetter applyUser={applyUser}>
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

        {applyType === "實習中" && (
          <div className="flex flex-col sm:grid grid-cols-2 gap-3 justify-around">
            <MyButton
              onClick={() => handleClick("調整實習時間")}
              classnames="text-white bg-lime-500 hover:bg-lime-600 focus:bg-lime-700"
            >
              調整實習時間
            </MyButton>
            <MyButton
              onClick={() => handleClick("中斷實習")}
              classnames="text-white bg-red-500 hover:bg-red-600 focus:bg-red-700"
            >
              中斷實習
            </MyButton>
          </div>
        )}
      </ApplyCoverLetter>
    </MyDialog>
  );
};

const DatePickerDialog = ({
  applyStartTime,
  applyEndTime,
  title,
  isOpen,
  onSure,
  onClose,
}: {
  applyStartTime: string;
  applyEndTime: string;
  title: string;
  isOpen: boolean;
  onSure: (applyStartTime: string, applyEndTime: string) => void;
  onClose: () => void;
}) => {
  const [startTime, setStartTime] = useState<Dayjs | null>(
    applyStartTime ? dayjs(applyStartTime) : null
  );
  const [endTime, setEndTime] = useState<Dayjs | null>(
    applyEndTime ? dayjs(applyEndTime) : null
  );

  return (
    <MyDialog isOpen={isOpen} onClose={onClose}>
      <div className="max-w-[300px] sm:max-w-none sm:w-[400px] p-3">
        <div className="text-xl text-center font-bold">{title}</div>
        <hr className="w-full" />
        <div className="flex flex-col md:flex-row gap-2">
          <div>
            <div className="md:text-center mb-2">開始時間</div>
            <MyDatePicker
              value={startTime}
              onChange={(newValue: any, onChange: any) => {
                setStartTime(newValue);
              }}
            />
          </div>
          <div>
            <div className="md:text-center mb-2">結束時間</div>
            <MyDatePicker
              value={endTime}
              onChange={(newValue: any, onChange: any) => {
                setEndTime(newValue);
              }}
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:grid grid-cols-2 gap-3 sm:gap-10">
          <MyButton
            onClick={() =>
              onSure(
                startTime!.format("YYYY-MM-DD"),
                endTime!.format("YYYY-MM-DD")
              )
            }
            classnames="text-white bg-green-500 hover:bg-green-600 focus:bg-green-700"
          >
            確認
          </MyButton>
          <MyButton
            onClick={() => {
              setStartTime(applyStartTime ? dayjs(applyStartTime) : null);
              setEndTime(applyEndTime ? dayjs(applyEndTime) : null);
              onClose();
            }}
            classnames="hover:bg-gray-300"
          >
            取消
          </MyButton>
        </div>
      </div>
    </MyDialog>
  );
};

export const DoubleCheckDialog = ({
  title,
  content,
  isOpen,
  isLoading,
  onSure,
  onClose,
  type,
}: {
  title: string;
  content: string;
  isLoading?: boolean;
  isOpen: boolean;
  onSure: () => void;
  onClose: () => void;
  type?: "danger" | "success" | "primary";
}) => {
  const onSureBtnStyle =
    type === "danger"
      ? `bg-red-500 hover:bg-red-600 focus:bg-red-700`
      : type === "primary"
      ? `bg-blue-500 hover:bg-blue-600 focus:bg-blue-700`
      : type === "success"
      ? `bg-green-500 hover:bg-green-600 focus:bg-green-700`
      : "bg-green-500 hover:bg-green-600 focus:bg-green-700";

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
            classnames={`text-white h-[40px] ${onSureBtnStyle}`}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={20} /> : "確認"}
          </MyButton>
          <MyButton
            disabled={isLoading}
            onClick={onClose}
            classnames="hover:bg-gray-300"
          >
            取消
          </MyButton>
        </div>
      </div>
    </MyDialog>
  );
};

export const ImageDialog = ({
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
