"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Card from "../../../components/Card";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import ResumeItemHeader from "./shared/ResumeItemHeader";
import ResumeItemContent from "./shared/ResumeItemContent";
import HeaderController from "./shared/HeaderController";
import MyButton from "../../../components/MyButton";
import Modal from "@mui/material/Modal";
import TextFiled from "./shared/TextField";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs, { Dayjs } from "dayjs";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  useDeleteResumeDetail,
  usePostResumeDetail,
  usePutResumeDetail,
} from "@/hooks/resume/useResumeDetail";
import ResumeDetailActions from "./shared/ResumeDetailActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #ddd",
  boxShadow: 24,
  p: 4,
};

// 工作經驗

interface WorkExperice {
  name: string;
  department: string;
  companyName: string;
  startTime: string;
  endTime: string;
  id: string;
  resumeId: string;
  userId: string;
}

interface Props {
  userId: string;
  resumeId: string;
  workExperience: WorkExperice[];
  isEditMode: boolean;
}

const RworkExperience = ({
  userId,
  resumeId,
  workExperience,
  isEditMode,
}: Props) => {
  const [data, setData] = useState<WorkExperice[]>(workExperience);
  const [isEditing, setIsEditing] = useState<null | number>(null); // 編輯data裡第幾個或無

  const handleEdit = (index: number) => {
    setIsEditing(index);
  };

  const { mutate: PostMutate } = usePostResumeDetail(resumeId);
  const { mutate: PutMutate } = usePutResumeDetail(resumeId);
  const { mutate: DeleteMutate } = useDeleteResumeDetail(resumeId);

  const handleDelete = (WEId: string) => {
    DeleteMutate({
      userId,
      resumeId,
      endpoint: "work-experience",
      endpointId: WEId,
    });
  };

  const handleSave = (WEId: string, WE: WorkExperice) => {
    WE.id
      ? PutMutate({
          userId,
          resumeId,
          endpoint: "work-experience",
          endpointId: WE.id,
          formData: {
            name: WE.name,
            department: WE.department,
            companyName: WE.companyName,
            startTime: WE.startTime,
            endTime: WE.endTime,
          },
        })
      : PostMutate({
          userId,
          resumeId,
          endpoint: "work-experience",
          formData: {
            name: WE.name,
            department: WE.department,
            companyName: WE.companyName,
            startTime: WE.startTime,
            endTime: WE.endTime,
          },
        });

    setIsEditing(null);
  };

  useEffect(() => {
    if (workExperience) {
      setData(workExperience);
    }
  }, [workExperience]);

  const renderedWorkExperiences = () => {
    if (data.length > 0) {
      return data.map((WE, index) => (
        <WorkExperienceCard
          key={(WE.name, index)}
          WE={WE}
          index={index}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isEditMode={isEditMode}
        />
      ));
    } else {
      return <div>填寫工作經驗，讓公司更了解你！</div>;
    }
  };

  return (
    <Card>
      <ResumeItemHeader label="工作經歷">
        <HeaderController
          text="新增"
          Icon={AddIcon}
          isEditing={isEditing}
          setIsEditing={() => {
            if (isEditing === null) setIsEditing(data.length);
            else setIsEditing(null);
          }}
          isEditMode={isEditMode}
        />
      </ResumeItemHeader>
      <ResumeItemContent>
        {isEditing !== null ? (
          <WorkExperienceEditCard
            WE={isEditing > data.length ? null : data[isEditing]}
            handleSave={handleSave}
            setIsEditing={setIsEditing}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 w-full">
            {renderedWorkExperiences()}
          </div>
        )}
      </ResumeItemContent>
    </Card>
  );
};

const WorkExperienceEditCard = ({
  WE,
  handleSave,
  setIsEditing,
}: {
  WE: WorkExperice | null;
  handleSave: (WEId: string, WE: WorkExperice) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const state = WE
    ? WE
    : {
        name: "",
        department: "",
        companyName: "",
        startTime: "",
        endTime: "",
        id: "",
        resumeId: "",
        userId: "",
      };
  const [data, setData] = useState(state);
  const [startTime, setStartTime] = React.useState<Dayjs | null>(null);
  const [endTime, setEndTime] = React.useState<Dayjs | null>(null);
  const [stillwork, setStillWork] = useState(false); // 是否在職
  const [errors, setErrors] = useState<{
    startTime: boolean;
    endTime: boolean;
  }>({ startTime: false, endTime: false });
  const disabled =
    !data.name ||
    !data.companyName ||
    !data.department ||
    !data.startTime ||
    !data.endTime ||
    errors.startTime ||
    errors.endTime ||
    data.startTime > data.endTime;

  const formatDate = "YYYY-MM-DD";
  useEffect(() => {
    if (data.startTime) {
      setStartTime(dayjs(data.startTime, formatDate));
    }
    if (data.endTime) {
      if (data.endTime === "仍在職") {
        setEndTime(null);
        setStillWork(true);
      } else setEndTime(dayjs(data.endTime, formatDate));
    }
  }, [data.endTime, data.startTime]);

  const mergeStartTimeToData = () => {
    if (startTime) {
      setData({ ...data, startTime: startTime.format(formatDate) });
    }
  };

  const mergeEndTimeToData = () => {
    if (endTime) {
      setData({ ...data, endTime: endTime.format(formatDate) });
    }
  };

  useEffect(() => {
    mergeStartTimeToData();
  }, [startTime]);

  useEffect(() => {
    mergeEndTimeToData();
  }, [endTime]);

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full">
      <TextFiled
        label="公司名稱："
        value={data.companyName}
        name="companyName"
        onChange={handleTextChange}
      ></TextFiled>
      <TextFiled
        label="職務名稱："
        value={data.name}
        name="name"
        onChange={handleTextChange}
      ></TextFiled>
      <TextFiled
        label="職位部門："
        value={data.department}
        name="department"
        onChange={handleTextChange}
      ></TextFiled>
      <div className="w-full md:max-w-[700px] flex flex-col md:flex-row justify-center items-start md:items-center">
        <div className="w-full max-w-[100px]">
          <span>任職期間：</span>
        </div>
        <div className="w-full flex gap-3 items-center">
          <DateField
            fullWidth
            size="small"
            value={startTime}
            name="startTime"
            format={"YYYY／MM／DD"}
            // error={data.startTime > data.endTime ? true : undefined}
            onChange={(newValue: any, context: any) => {
              if (context.validationError == null) {
                setStartTime(newValue);
                setErrors({ ...errors, startTime: false });
              } else setErrors({ ...errors, startTime: true });
            }}
            maxDate={dayjs()}
          />
          －
          <DateField
            fullWidth
            size="small"
            value={endTime}
            name="endTime"
            format={"YYYY／MM／DD"}
            // error={data.startTime > data.endTime ? true : undefined}
            disabled={stillwork ? true : undefined}
            onChange={(newValue: any, context: any) => {
              if (context.validationError == null) {
                setEndTime(newValue);
                setErrors({ ...errors, endTime: false });
              } else setErrors({ ...errors, endTime: true });
            }}
            maxDate={dayjs()}
          />
        </div>
      </div>
      <div className="w-full md:max-w-[700px] flex justify-end items-center">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={stillwork}
                onChange={(e, checked) => {
                  setStillWork(checked);
                  if (checked) {
                    setData({ ...data, endTime: "仍在職" });
                  } else {
                    setData({ ...data, endTime: "" });
                  }
                }}
              />
            }
            label="仍在職"
          />
        </FormGroup>
      </div>
      <div className="flex gap-24">
        <MyButton
          disabled={disabled}
          onClick={() => handleSave(data.id, data)}
          classnames="w-[100px] bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400 hover:bg-blue-600 text-white"
        >
          儲存
        </MyButton>
        <MyButton
          onClick={() => setIsEditing(null)}
          classnames="w-[100px] hover:bg-gray-300"
        >
          取消
        </MyButton>
      </div>
    </div>
  );
};

interface WorkExperienceCardProps {
  WE: WorkExperice;
  handleEdit: (index: number) => void;
  handleDelete: (WEId: string) => void;
  index: number;
  isEditMode: boolean;
}

const WorkExperienceCard = ({
  WE,
  handleEdit,
  handleDelete,
  index,
  isEditMode,
}: WorkExperienceCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      className="w-full md:max-w-[700px] flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-full grow">
        <div className="font-bold text-lg">{WE.name}</div>
        <div className="font-bold">
          {WE.companyName} {WE.department}
        </div>
        <div className="text-slate-700 text-sm">
          {WE.startTime.substring(0, 10)}－{WE.endTime.substring(0, 10)}
        </div>
      </div>
      {isEditMode && hovered ? (
        <div className="flex justify-end items-center gap-3 text-gray-500">
          <ResumeDetailActions
            onEditClick={() => handleEdit(index)}
            onDelete={() => {
              handleDelete(WE.id);
              setOpen(false);
              setHovered(false);
            }}
            onClose={() => setHovered(false)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default RworkExperience;
