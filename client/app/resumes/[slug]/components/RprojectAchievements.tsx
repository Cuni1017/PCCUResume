import React, { ChangeEvent, useEffect, useState } from "react";
import Card from "../../../components/Card";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ResumeItemHeader from "./ResumeItemHeader";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MyButton from "../../../components/MyButton";
import ResumeItemContent from "./ResumeItemContent";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextFiled from "./TextFiled";

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
  console.log(isEditing);

  const handleSave = (
    PAId: string, //空的表示要Post新的
    PA: ProjectAchievement
  ) => {
    console.log(PAId);
    console.log(PA, "PA");
  };

  useEffect(() => {
    if (projectAchievements) {
      setData(projectAchievements);
    }
  }, [projectAchievements]);

  const renderedPAs = () => {
    if (data.length > 0) {
      return data.map((PA, index) => (
        <PACard key={PA.id} PA={PA} handleEdit={handleEdit} index={index} />
      ));
    } else {
      return <div>填寫專案成就，顯現自身價值！</div>;
    }
  };

  return (
    <Card>
      <ResumeItemHeader label="專案成就">
        {isEditing !== null ? null : (
          <span
            onClick={handleNew}
            className="text-end text-sm flex items-center justify-end text-gray-500 hover:text-gray-800 cursor-pointer absolute top-1 right-5"
          >
            <AddIcon />
            新增
          </span>
        )}
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
  const disabled = false;

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

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [data, setData] = useState(state);

  return (
    <div className="flex flex-col w-full items-center justify-center gap-3">
      <TextFiled
        label="專案名稱："
        value={data.name}
        name="name"
        onChange={handleTextChange}
      ></TextFiled>
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
  index: number;
}

const PACard = ({ PA, handleEdit, index }: PACardProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {};

  return (
    <div className="flex w-full">
      <div className="w-full grow">
        <div className="font-bold text-lg">{PA.name}</div>
        <div className="font-bold">{PA.talk}</div>
        <div className="text-slate-700 text-sm">
          {PA.startTime} ~ {PA.endTime}
        </div>
        <a
          href={PA.url}
          target="_blank"
          className="flex items-center text-blue-500 text-sm"
        >
          前往觀看
          <KeyboardArrowRightIcon />
        </a>
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="font-bold text-xl">確定刪除嗎？</div>
            <div className="text-sm">資料刪除後無法還原喔！確定刪除？</div>
            <div className="flex justify-center gap-10 mt-5">
              <MyButton
                onClick={() => {
                  handleDelete();
                  setOpen(false);
                }}
                classNames="bg-[#e25555] hover:bg-red-800 text-white w-[100px]"
              >
                確定
              </MyButton>
              <MyButton
                onClick={handleClose}
                classNames="hover:bg-gray-300 w-[100px]"
              >
                取消
              </MyButton>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RprojectAchievements;
