import React from "react";
import Card from "../../../components/Card";
import OutlinedInput from "@mui/material/OutlinedInput";


// 證照

interface Props {
  userId: string;
  resumeId: string;
  license: { name: string }[];
}

const Rlicense = ({ userId, resumeId, license }: Props) => {
  return <Card>Rlicense</Card>;
};

export default Rlicense;
