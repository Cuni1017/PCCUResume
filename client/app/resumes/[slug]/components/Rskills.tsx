"use client";

import React, { useState } from "react";
import Card from "../../../components/Card";
import ResumeItemHeader from "./shared/ResumeItemHeader";
import ResumeItemContent from "./shared/ResumeItemContent";
import HeaderController from "./shared/HeaderController";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import SkillPicker from "@/app/components/SkillPicker";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import SaveCheck from "./shared/SaveCheck";
import {
  usePostResumeDetail,
  usePutResumeDetail,
} from "@/hooks/Resume/useResumeDetail";

interface Skill {
  rskillId?: string;
  skillName: string;
  skillId: number;
}

interface Props {
  userId: string;
  resumeId: string;
  skills: Skill[];
  isEditMode: boolean;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Rskills = ({ userId, resumeId, skills, isEditMode }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const renderedSkills = skills.map((skill) => (
    <SkillCard key={skill.skillId} skill={skill} />
  ));

  return (
    <Card>
      <ResumeItemHeader label="技能">
        <HeaderController
          Icon={EditIcon}
          text="編輯"
          isEditing={isEditing}
          setIsEditing={() => setIsEditing(!isEditing)}
          isEditMode={isEditMode}
        />
      </ResumeItemHeader>
      <ResumeItemContent>
        {!isEditing ? (
          <div className="flex gap-2 flex-wrap">{renderedSkills}</div>
        ) : null}
        {isEditMode ? (
          <SkillEditCard
            userId={userId}
            resumeId={resumeId}
            skills={skills}
            classnames={`${isEditing ? "block" : "hidden"}`}
            setIsEditing={setIsEditing}
          />
        ) : null}
      </ResumeItemContent>
    </Card>
  );
};

export default Rskills;

const SkillEditCard = ({
  userId,
  resumeId,
  skills,
  classnames,
  setIsEditing,
}: {
  userId: string;
  resumeId: string;
  skills: Skill[];
  classnames: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [techs, setTechs] = useState(skills);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: PutMutate } = usePutResumeDetail(resumeId);

  const handleDelete = (chipToDelete: Skill) => () => {
    setTechs((skills) =>
      skills.filter((skill) => skill.skillId !== chipToDelete.skillId)
    );
  };

  const handleSave = () => {
    PutMutate({
      userId,
      resumeId,
      endpoint: "skill",
      formData: { skillIds: techs.map((tech) => tech.skillId) },
    });
    setIsEditing(false);
  };

  return (
    <div className={`w-full ${classnames}`}>
      <div
        className="flex cursor-pointer mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "start",
            flexWrap: "wrap",
            listStyle: "none",
            width: "100%",
            boxShadow: 0.02,
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {techs.map((tech) => {
            return (
              <ListItem key={tech.skillId}>
                <Chip label={tech.skillName} onDelete={handleDelete(tech)} />
              </ListItem>
            );
          })}
        </Paper>
      </div>
      <SkillPicker
        skills={techs}
        setSkills={(skills: Skill[]) => setTechs(skills)}
        classnames={isOpen ? "block" : "hidden"}
      />
      <SaveCheck
        classnames="mt-2"
        onSave={handleSave}
        onCancel={() => {
          setIsEditing(false);
          setTechs(skills);
        }}
        disabled={false}
      />
    </div>
  );
};

const SkillCard = ({ skill }: { skill: Skill }) => {
  const { skillName } = skill;
  const imgSrc = `/techs/${skillName}.svg`;

  return (
    <Card classnames="flex items-center p-2 gap-2">
      <div className="relative w-[3rem] h-[3rem]">
        <Image src={imgSrc} alt={skillName} fill sizes="100%"></Image>
      </div>
      <div className="font-bold">{skillName}</div>
    </Card>
  );
};
