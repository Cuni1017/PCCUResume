import React from "react";
import Card from "../../../components/Card";
import OutlinedInput from "@mui/material/OutlinedInput";

// 特殊技能

interface Props {
  userId: string;
  resumeId: string;
  speicalSkill: { name: string; talk: string; special: string }[];
}

const RspecialSkill = ({ userId, resumeId, speicalSkill }: Props) => {
  return <Card>RspecialSkill</Card>;
};

export default RspecialSkill;
