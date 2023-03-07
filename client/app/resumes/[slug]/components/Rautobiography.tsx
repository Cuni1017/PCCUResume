import React from "react";
import Card from "../../../components/Card";
import OutlinedInput from "@mui/material/OutlinedInput";

// 自傳

interface Props {
  userId: string;
  resumeId: string;
  autobiography: {
    chineseAutobiography: string | null;
    englishAutobiography: string | null;
  };
}

const Rautobiography = ({ userId, resumeId, autobiography }: Props) => {
  return <Card>Rautobiography</Card>;
};

export default Rautobiography;
