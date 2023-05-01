"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Card from "../../../components/Card";
import ResumeItemHeader from "./shared/ResumeItemHeader";
import ResumeItemContent from "./shared/ResumeItemContent";
import HeaderController from "./shared/HeaderController";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DeleteCheckModal from "./shared/DeleteCheckModal";
import SaveCheck from "./shared/SaveCheck";
import TextFiled from "./shared/TextField";
import {
  useDeleteResumeDetail,
  usePostResumeDetail,
  usePutResumeDetail,
} from "@/hooks/Resume/useResumeDetail";

// 特殊技能

interface SpeicalSkill {
  name: string;
  talk: string;
  special: string;
  id: string;
  resumeId: string;
  userId: string;
}

interface Props {
  userId: string;
  resumeId: string;
  specialSkills: SpeicalSkill[];
  isEditMode: boolean;
}

const RspecialSkill = ({
  userId,
  resumeId,
  specialSkills,
  isEditMode,
}: Props) => {
  const [data, setData] = useState<SpeicalSkill[]>(specialSkills);
  const [isEditing, setIsEditing] = useState<null | number>(null); // 編輯data裡第幾個或無

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
          isEditMode={isEditMode}
        />
      ));
    } else {
      return (
        <div className="text-center w-full col-span-2">
          填寫特殊技能，更公司更了解你！
        </div>
      );
    }
  };

  return (
    <Card>
      <ResumeItemHeader label="特殊技能">
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
        {isEditing !== null && isEditMode ? (
          <SSEditCard
            userId={userId}
            resumeId={resumeId}
            specialSkill={isEditing > data.length ? null : data[isEditing]}
            setIsEditing={setIsEditing}
          />
        ) : (
          <div className="flex flex-col sm:grid grid-cols-2 gap-3 w-full">
            {renderedSpeicalSkills()}
          </div>
        )}
      </ResumeItemContent>
    </Card>
  );
};

const SSEditCard = ({
  userId,
  resumeId,
  specialSkill,
  setIsEditing,
}: {
  userId: string;
  resumeId: string;
  specialSkill: SpeicalSkill | null;
  setIsEditing: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const state = specialSkill
    ? specialSkill
    : {
        name: "",
        talk: "",
        special: "",
        id: "",
      };
  const [data, setData] = useState(state);

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const { mutate: PostMutate } = usePostResumeDetail(resumeId);
  const { mutate: PutMutate } = usePutResumeDetail(resumeId);

  const handleSave = () => {
    if (!data.id) {
      PostMutate({
        userId,
        resumeId,
        endpoint: "special-skill",
        formData: {
          name: data.name,
          talk: data.talk,
          special: data.special,
        },
      });
    } else {
      PutMutate({
        userId,
        resumeId,
        endpoint: "special-skill",
        endpointId: data.id,
        formData: {
          name: data.name,
          talk: data.talk,
          special: data.special,
        },
      });
    }

    setIsEditing(null);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <TextFiled
        label="技能名稱："
        value={data.name}
        name="name"
        onChange={handleTextChange}
      />
      <TextFiled
        label="技能敘述："
        value={data.talk}
        name="talk"
        multiline
        fullWidth
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
  isEditMode,
}: {
  specialSkill: SpeicalSkill;
  setIsEditing: React.Dispatch<React.SetStateAction<number | null>>;
  index: number;
  isEditMode: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  const handleEdit = () => {
    setIsEditing(index);
  };

  const { mutate: DeleteMutate } = useDeleteResumeDetail(specialSkill.resumeId);

  const handleDelete = () => {
    DeleteMutate({
      userId: specialSkill.userId,
      resumeId: specialSkill.resumeId,
      endpoint: "special-skill",
      endpointId: specialSkill.id,
    });
  };
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative w-full"
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
      {hovered && isEditMode ? (
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
      {isEditMode ? (
        <DeleteCheckModal
          open={open}
          onDelete={handleDelete}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
};

export default RspecialSkill;
