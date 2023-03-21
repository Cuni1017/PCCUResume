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
  maxWidth: 360,
  bgcolor: "background.paper",
};

interface Skill {
  skillId: number;
  skillName: string;
}

const SkillPicker = () => {
  const [data, setData] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);

  const handleClick = (skillId: number) => {
    setData([...data, skillId]);
  };

  console.log(data);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data } = await axiosInstance.get("/vacancies/skills");
      if (data) setSkills(data);
    };
    fetchSkills();
  }, []);

  const renderedListItem = skills.map((skill) => (
    <ListItem
      button
      key={skill.skillId}
      onClick={() => handleClick(skill.skillId)}
    >
      <ListItemText primary={skill.skillName} />
    </ListItem>
  ));

  return (
    <>
      <InputSkillChips chipData={data} />
      <br />
      <List
        sx={style}
        component="nav"
        aria-label="skills"
        // style={{ display: "none" }}
      >
        {renderedListItem}
        {/* divider、light */}
        {/* <ListItem button onClick={handleClick}>
          <ListItemText primary="Inbox" />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary="Spam" />
        </ListItem> */}
      </List>
    </>
  );
};

interface ChipData {
  key: number;
  label: string;
}

const ChipListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const InputSkillChips = ({ chipData }: { chipData: any }) => {
  // const [chipData, setChipData] = React.useState<readonly ChipData[]>([
  //   { key: 0, label: "Angular" },
  //   { key: 1, label: "jQuery" },
  //   { key: 2, label: "Polymer" },
  //   { key: 3, label: "React" },
  //   { key: 4, label: "Vue.js" },
  // ]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "start",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data: any) => {
        let icon;

        if (data.label === "React") {
          icon = <TagFacesIcon />;
        }

        return (
          <ChipListItem key={data.number}>
            <Chip
              icon={icon}
              label={data.number}
              onDelete={data.label === "React" ? undefined : handleDelete(data)}
            />
          </ChipListItem>
        );
      })}
    </Paper>
  );
};

export default SkillPicker;
