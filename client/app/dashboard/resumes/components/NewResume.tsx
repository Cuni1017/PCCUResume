import React, { useState } from "react";
import { TextField } from "@mui/material";
import Card from "../../../components/Card";
import MyButton from "../../../components/MyButton";
import { usePostResume } from "../../../../hooks/useResume";

const NewResume = ({ userId }: { userId: string }) => {
  const mutation = usePostResume();
  const { mutate } = mutation;
  // console.log(mutation);

  const [formData, setFormData] = useState({ name: "" });

  const disabled = formData.name === "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    mutate({ userId, formData });
  };

  // console.log(formData);

  return (
    <Card className="bg-white border-solid border-gray-300 border shadow">
      <div className="px-2">
        <div className="text-md flex items-center justify-center gap-2 py-2">
          <span className="w-full max-w-[100px]">履歷名稱：</span>
          <TextField
            size="small"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="我的第一份履歷"
            variant="standard"
          />
        </div>
      </div>
      <div className="flex px-2 py-2 gap-2 bg-gray-100 border-solid border-0 border-t border-gray-300">
        <MyButton
          onClick={handleSubmit}
          classNames="w-full hover:bg-gray-300"
          disabled={disabled}
        >
          確認
        </MyButton>
      </div>
    </Card>
  );
};

export default NewResume;
