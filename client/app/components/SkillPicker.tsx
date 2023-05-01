"use client";
import React, { ChangeEvent, useState } from "react";
import { useGetSkills } from "@/hooks/useSkills";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Image from "next/image";
import { FormGroup } from "@mui/material";
import SearchBar from "./SearchContainer/SearchFilter/shared/SearchBar";

interface Skill {
  skillName: string;
  skillId: number;
}

interface Props {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  classnames?: string;
}

const SkillPicker = ({ skills, setSkills, classnames }: Props) => {
  const { data: techs } = useGetSkills();
  const [searchTerm, setSearchTerm] = useState("");

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (skill: Skill) => {
    let newArr: Skill[] = [...skills];
    const index = skills.findIndex((sk) => sk.skillName === skill.skillName);
    index === -1 ? newArr.push(skill) : newArr.splice(index, 1);
    setSkills(newArr);
  };

  const renderedSkillOptions = techs
    .filter((tech) =>
      tech.skillName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let skNames = skills.map((skill) => skill.skillName);
      if (skNames?.includes(a.skillName) && !skNames?.includes(b.skillName))
        return -1;
      if (!skNames?.includes(a.skillName) && skNames?.includes(b.skillName))
        return 1;
      return 0;
    })
    .map((tech) => {
      const { skillId, skillName } = tech;

      const imgSrc = `/techs/${
        skillName === "C#"
          ? "C Sharp"
          : skillName === ".net"
          ? "dot Net"
          : skillName
      }.svg`;

      return (
        <FormControlLabel
          key={tech.skillId}
          control={
            <Checkbox
              checked={
                skills.find((skill) => skill.skillId === tech.skillId)
                  ? true
                  : false
              }
              onClick={() => handleClick(tech)}
            />
          }
          label={
            <>
              <div className="flex items-center gap-2 text-lg text-slate-600 h-[25px]">
                <Image
                  src={imgSrc}
                  width={25}
                  height={25}
                  alt={skillName}
                ></Image>
                {skillName}
              </div>
            </>
          }
        />
      );
    });

  return (
    <div
      className={`min-w-[200px] md:w-full h-[400px] overflow-auto border-solid border-gray-300 border ${classnames}`}
    >
      <div className="p-3 pb-0">
        <SearchBar value={searchTerm} onChange={handleTextChange} />
      </div>
      <div className="px-3">
        <FormGroup>{renderedSkillOptions}</FormGroup>
      </div>
    </div>
  );
};

export default SkillPicker;
