"use client";

import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { axiosInstance } from "@/axiosInstance.ts";

const style = {
  width: "100%",
  // maxWidth: 360,
  bgcolor: "background.paper",
};

interface Skill {
  skillId: number;
  skillName: string;
}

const SkillPicker = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [data, setData] = useState<Skill[]>([
    { skillId: 1, skillName: "React" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      const { data } = await axiosInstance.get("/vacancies/skills");
      if (data) setSkills(data);
    };
    fetchSkills();
  }, []);

  const handleClick = (skillId: number, skillName: string) => {
    if (data.every((skill) => skill.skillId !== skillId))
      setData([...data, { skillId, skillName }]);
  };

  console.log(data);

  const renderedListItem = skills.map((skill) => (
    <ListItem
      button
      divider
      key={skill.skillId}
      style={{ display: isOpen ? "flex" : "none" }}
      onClick={() =>
        handleClick(
          parseInt(skill.skillId as unknown as string),
          skill.skillName
        )
      }
    >
      <ListItemText primary={skill.skillName} />
    </ListItem>
  ));

  return (
    <>
      <InputSkillChips
        onClick={() => setIsOpen(!isOpen)}
        chipData={data}
        setChipData={setData}
      />
      <List sx={style} component="nav" aria-label="skills">
        <div className="flex flex-col max-h-[400px] overflow-auto">
          {renderedListItem}
        </div>
        {/* divider、light */}
      </List>
    </>
  );
};

const ChipListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const InputSkillChips = ({
  onClick,
  chipData,
  setChipData,
}: {
  onClick: () => void;
  chipData: any;
  setChipData: React.Dispatch<React.SetStateAction<Skill[]>>;
}) => {
  const handleDelete = (chipToDelete: Skill) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.skillId !== chipToDelete.skillId)
    );
  };

  return (
    <Paper
      onClick={onClick}
      sx={{
        display: "flex",
        justifyContent: "start",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
        mb: 1,
      }}
      component="ul"
      className="cursor-pointer"
    >
      {chipData.map((data: Skill) => {
        let icon;

        // if (data.skillName === "React") {
        //   icon = <TagFacesIcon />;
        // }

        return (
          <ChipListItem key={data.skillId}>
            <Chip
              icon={icon}
              label={data.skillName}
              onDelete={
                data.skillName === "React" ? undefined : handleDelete(data)
              }
            />
          </ChipListItem>
        );
      })}
    </Paper>
  );
};

export default SkillPicker;
