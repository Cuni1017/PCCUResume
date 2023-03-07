import OutlinedInput from "@mui/material/OutlinedInput";
import React, { ChangeEvent } from "react";

const TextFiled = ({
  label,
  name,
  value,
  onChange,
  ...rest
}: {
  label: string;
  name: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  [keys: string]: any;
}) => {
  return (
    <div className="w-full md:max-w-[700px] flex flex-col md:flex-row justify-center items-start md:items-center">
      <div className="w-full max-w-[100px]">
        <span>{label}</span>
      </div>
      <OutlinedInput
        size="small"
        name={name}
        fullWidth
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default TextFiled;
