import React, { ChangeEvent, useEffect, useState } from "react";
import Card from "../../../components/Card";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DeleteCheckModal from "./shared/DeleteCheckModal";
import ResumeItemHeader from "./shared/ResumeItemHeader";
import ResumeItemContent from "./shared/ResumeItemContent";
import HeaderController from "./shared/HeaderController";
import MyButton from "../../../components/MyButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextFiled from "./shared/TextFiled";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs, { Dayjs } from "dayjs";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  useDeleteResumeDetail,
  usePostResumeDetail,
  usePutResumeDetail,
} from "@/hooks/Resume/useResumeDetail";

// 專案成就

interface ProjectAchievement {
  name: string;
  talk: string; //描述
  url: string; //github網址
  startTime: string;
  endTime: string;
  id: string;
  resumeId: string;
  userId: string;
}

interface Props {
  userId: string;
  resumeId: string;
  projectAchievements: ProjectAchievement[];
}

const RprojectAchievements = ({
  userId,
  resumeId,
  projectAchievements,
}: Props) => {
  const [data, setData] = useState<ProjectAchievement[]>([]);
  const [isEditing, setIsEditing] = useState<null | number>(null); // 編輯data裡第幾個或無

  const handleNew = () => {
    setIsEditing(data.length);
  };

  const handleEdit = (index: number) => {
    setIsEditing(index);
  };

  const { mutate: PostMutate } = usePostResumeDetail(resumeId);
  const { mutate: PutMutate } = usePutResumeDetail(resumeId);
  const { mutate: DeleteMutate } = useDeleteResumeDetail(resumeId);

  const handleSave = (
    PAId: string, //空的表示要Post新的
    PA: ProjectAchievement
  ) => {

    // 表示New
    if (!PAId) {
      PostMutate({
        userId,
        resumeId,
        endpoint: "project-achievments",
        formData: {
          name: PA.name,
          startTime: PA.startTime,
          endTime: PA.endTime,
          talk: PA.talk,
          url: PA.url,
        },
      });
    } else {
      PutMutate({
        userId,
        resumeId,
        endpoint: "project-achievments",
        endpointId: PA.id,
        formData: {
          name: PA.name,
          startTime: PA.startTime,
          endTime: PA.endTime,
          talk: PA.talk,
          url: PA.url,
        },
      });
    }

    setIsEditing(null);
  };

  const handleDelete = (PAId: string) => {

    DeleteMutate({
      userId,
      resumeId,
      endpoint: "project-achievments",
      endpointId: PAId,
    });
  };

  useEffect(() => {
    if (projectAchievements) {
      setData(projectAchievements);
    }
  }, [projectAchievements]);

  const renderedPAs = () => {
    if (data.length > 0) {
      return data.map((PA, index) => (
        <PACard
          key={PA.id}
          PA={PA}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          index={index}
        />
      ));
    } else {
      return <div>填寫專案成就，顯現自身價值！</div>;
    }
  };

  return (
    <Card>
      <ResumeItemHeader label="專案成就">
        <HeaderController
          text="新增"
          Icon={AddIcon}
          isEditing={isEditing}
          setIsEditing={() => {
            if (isEditing === null) setIsEditing(data.length);
            else setIsEditing(null);
          }}
        />
        {/* {isEditing !== null ? null : (
          <span
            onClick={handleNew}
            className="text-end text-sm flex items-center justify-end text-gray-500 hover:text-gray-800 cursor-pointer absolute top-1 right-5"
          >
            <AddIcon />
            新增
          </span>
        )} */}
      </ResumeItemHeader>
      <ResumeItemContent>
        {isEditing !== null ? (
          <PAEditCard
            PA={isEditing > data.length ? null : data[isEditing]}
            setIsEditing={setIsEditing}
            handleSave={handleSave}
          />
        ) : (
          <div className="w-full flex flex-col items-center justify-center gap-3">
            {renderedPAs()}
          </div>
        )}
      </ResumeItemContent>
    </Card>
  );
};

const PAEditCard = ({
  PA,
  handleSave,
  setIsEditing,
}: {
  PA: ProjectAchievement | null;
  handleSave: (PAId: string, PA: ProjectAchievement) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const state = PA
    ? PA
    : {
        name: "",
        talk: "",
        url: "",
        startTime: "",
        endTime: "",
        id: "",
        resumeId: "",
        userId: "",
      };

  const [data, setData] = useState(state);
  const [startTime, setStartTime] = React.useState<Dayjs | null>(null);
  const [endTime, setEndTime] = React.useState<Dayjs | null>(null);
  const [stillwork, setStillWork] = useState(false); // 是否仍進行中
  const [errors, setErrors] = useState<{
    startTime: boolean;
    endTime: boolean;
  }>({ startTime: false, endTime: false });
  const disabled =
    !data.name ||
    !data.talk ||
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
      if (data.endTime === "仍在進行") {
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
    <div className="flex flex-col w-full items-center justify-center gap-3">
      <TextFiled
        label="專案名稱："
        value={data.name}
        name="name"
        onChange={handleTextChange}
      ></TextFiled>
      <TextFiled
        label="專案敘述："
        value={data.talk}
        multiline
        fullWidth
        minRows={2}
        maxRows={6}
        name="talk"
        onChange={handleTextChange}
      ></TextFiled>
      <TextFiled
        label="專案連結："
        value={data.url}
        name="url"
        onChange={handleTextChange}
      ></TextFiled>

      <div className="w-full md:max-w-[700px] flex flex-col md:flex-row justify-center items-start md:items-center">
        <div className="w-full max-w-[100px]">
          <span>專案時間：</span>
        </div>
        <div className="w-full flex gap-3 items-center">
          <DateField
            fullWidth
            size="small"
            value={startTime}
            name="startTime"
            format={"YYYY／MM／DD"}
            error={data.startTime > data.endTime ? true : undefined}
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
            error={data.startTime > data.endTime ? true : undefined}
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
                    setData({ ...data, endTime: "仍在進行" });
                  } else {
                    setData({ ...data, endTime: "" });
                  }
                }}
              />
            }
            label="仍在進行"
          />
        </FormGroup>
      </div>

      <div className="flex gap-24">
        <MyButton
          disabled={disabled}
          onClick={() => handleSave(data.id, data)}
          classNames="w-[100px] bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400 hover:bg-blue-600 text-white"
        >
          儲存
        </MyButton>
        <MyButton
          onClick={() => setIsEditing(null)}
          classNames="w-[100px] hover:bg-gray-300"
        >
          取消
        </MyButton>
      </div>
    </div>
  );
};

interface PACardProps {
  PA: ProjectAchievement;
  handleEdit: (index: number) => void;
  handleDelete: (PAId: string) => void;
  index: number;
}

const PACard = ({ PA, handleEdit, handleDelete, index }: PACardProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex w-full">
      <div className="w-full grow">
        <div className="font-bold text-lg">{PA.name}</div>
        <div className="font-bold">{PA.talk}</div>
        <div className="text-slate-700 text-sm">
          {PA.startTime.substring(0, 10)} － {PA.endTime.substring(0, 10)}
        </div>
        <div className="flex">
          <a
            href={PA.url}
            target="_blank"
            className="flex items-center text-blue-500 text-sm w-auto"
          >
            前往觀看
            <KeyboardArrowRightIcon />
          </a>
          <div className="grow"></div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3 text-gray-500">
        <div
          className="cursor-pointer hover:text-gray-800"
          onClick={() => handleEdit(index)}
        >
          <EditIcon />
        </div>
        <div className="cursor-pointer hover:text-red-800" onClick={handleOpen}>
          <DeleteIcon />
        </div>
      </div>
      <DeleteCheckModal
        open={open}
        onDelete={() => {
          handleDelete(PA.id);
          setOpen(false);
        }}
        onClose={handleClose}
      />
    </div>
  );
};

export default RprojectAchievements;
