import React, { ChangeEvent, useState } from "react";
import { Button, TextField } from "@mui/material";

const ValidateForm = () => {
  const [input, setInput] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  return (
    <div className="mt-10 flex flex-col h-full">
      <h1 className="m-5">請輸入驗證碼</h1>
      <div className="flex justify-center">
        <TextField
          label="驗證碼"
          variant="outlined"
          value={input}
          onChange={handleChange}
          sx={{ width: "100%", maxWidth: "500px" }}
        />
      </div>
      <div className="mt-2 flex justify-center items-center gap-4">
        <span>沒有收到驗證碼？</span>
        <Button variant="contained" color="info">
          重新寄送
        </Button>
      </div>
      <div className="h-[300px]"></div>
      <Button variant="contained" className="mt-auto mb-10">
        提交
      </Button>
    </div>
  );
};

export default ValidateForm;
