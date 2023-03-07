import React, { ChangeEvent, useEffect, useState } from "react";
import Card from "../../../components/Card";
import ResumeItemHeader from "./shared/ResumeItemHeader";
import ResumeItemContent from "./shared/ResumeItemContent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DeleteCheckModal from "./shared/DeleteCheckModal";
import SaveCheck from "./shared/SaveCheck";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextFiled from "./shared/TextFiled";

// 專長

interface SpeicalSkill {
  name: string;
  talk: string;
  special: string;
}

interface Props {
  userId: string;
  resumeId: string;
  specialSkills: SpeicalSkill[];
}

const RspecialSkill = ({ userId, resumeId, specialSkills }: Props) => {
  const [data, setData] = useState<SpeicalSkill[]>([]);
  const [isEditing, setIsEditing] = useState<null | number>(null); // 編輯data裡第幾個或無

  const handleNew = () => {
    setIsEditing(data.length);
  };

  useEffect(() => {
    if (specialSkills) setData(specialSkills);
  }, [specialSkills]);

  const renderedSpeicalSkills = () => {
    if (data.length > 0) {
      return data.map((SS, index) => (
        <SpeicalSkillCard
          key={SS.name}
          specialSkill={SS}
          setIsEditing={setIsEditing}
          index={index}
        />
      ));
    } else {
      return (
        <div className="text-center w-full">
          填寫與別人不同的專長，讓公司看見你！
        </div>
      );
    }
  };

  return (
    <Card>
      <ResumeItemHeader label="專長">
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
          <SSEditCard
            specialSkill={isEditing > data.length ? null : data[isEditing]}
            setIsEditing={setIsEditing}
          />
        ) : (
          <div className="flex gap-3">{renderedSpeicalSkills()}</div>
        )}
      </ResumeItemContent>
    </Card>
  );
};

const SSEditCard = ({
  specialSkill,
  setIsEditing,
}: {
  specialSkill: SpeicalSkill | null;
  setIsEditing: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const state = specialSkill
    ? specialSkill
    : {
        name: "",
        talk: "",
        special: "",
      };
  const [data, setData] = useState(state);

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log(data, "save");
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <TextFiled
        label="專長名稱："
        value={data.name}
        name="name"
        onChange={handleTextChange}
      />
      <TextFiled
        label="專長敘述："
        value={data.talk}
        name="talk"
        multiline
        minRows={2}
        maxRows={5}
        onChange={handleTextChange}
      />
      <TextFiled
        label="特殊之處："
        value={data.special}
        name="special"
        onChange={handleTextChange}
      />
      <SaveCheck
        disabled={data.name === "" || data.special === "" || data.talk === ""}
        onSave={handleSave}
        onCancel={() => {
          setIsEditing(null);
        }}
      />
    </div>
  );
};

const SpeicalSkillCard = ({
  specialSkill,
  setIsEditing,
  index,
}: {
  specialSkill: SpeicalSkill;
  setIsEditing: React.Dispatch<React.SetStateAction<number | null>>;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  const handleEdit = () => {
    setIsEditing(index);
  };
  const handleDelete = () => {
    console.log(specialSkill, "delete");
  };
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-full">
        <Card>
          <div className="max-w-[350px] p-4">
            <div className="font-bold underline mb-2">{specialSkill.name}</div>
            <div>{specialSkill.talk}</div>
            <div className="text-slate-600 text-sm">{specialSkill.special}</div>
          </div>
        </Card>
      </div>
      {hovered ? (
        <div className="absolute top-2 right-2 flex gap-2">
          <div
            className="cursor-pointer text-gray-500 hover:text-gray-800"
            onClick={handleEdit}
          >
            <EditIcon />
          </div>
          <div
            className="cursor-pointer text-gray-500 hover:text-gray-800"
            onClick={() => setOpen(true)}
          >
            <DeleteIcon />
          </div>
        </div>
      ) : null}
      <DeleteCheckModal
        open={open}
        onDelete={handleDelete}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default RspecialSkill;
