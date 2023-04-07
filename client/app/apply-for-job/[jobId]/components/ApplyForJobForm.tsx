import React, { useCallback, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MyButton from "@/app/components/MyButton";
import { Resume } from "../page";
import Link from "next/link";

const initErrors = {
  resumeId: false,
  phone: false,
  email: false,
  letter: false,
};

interface Props {
  resumes: Resume[];
  STDInfo: {
    studentId: string;
    studentEmail: string;
    studentNumber: string | null;
    studentImageUrl: string | null;
    studentUsername: string;
  };
  onSubmit: (formData: {
    resumeId: string;
    phone: string;
    email: string;
    letter: string;
  }) => void;
  appIsLoading: boolean;
}

const ApplyForJobForm = ({
  resumes,
  STDInfo,
  onSubmit,
  appIsLoading,
}: Props) => {
  const [formData, setFormData] = useState({
    resumeId: "",
    phone: STDInfo.studentNumber || "",
    email: STDInfo.studentEmail || "",
    letter: "",
  });
  const [errors, setErrors] = useState(initErrors);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!checkIsFormCorrect()) return;
    onSubmit(formData);
  };

  const checkIsFormCorrect = useCallback(() => {
    let result = true;
    let newErrors = { ...initErrors };
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof typeof formData] === "") {
        newErrors[key as keyof typeof errors] = true;
        result = false;
      }
    });
    setErrors(newErrors);
    return result;
  }, [formData]);

  return (
    <>
      <div className="flex flex-col gap-2 text-slate-500">
        <div className="flex gap-1">
          履歷／CV <div className="text-xs text-red-500">*</div>
        </div>
        <div>
          {resumes.length > 0 ? (
            <FormControl fullWidth error={errors.resumeId}>
              <Select
                placeholder="請選擇"
                value={formData.resumeId}
                displayEmpty
                size="small"
                name="resumeId"
                onChange={handleSelectChange}
              >
                <MenuItem value="" disabled>
                  請選擇
                </MenuItem>
                {resumes.map((resume) => (
                  <MenuItem key={resume.resumeId} value={resume.resumeId}>
                    {resume.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-lg">您尚未填寫過任何履歷</div>
              <Link href="/dashboard/resumes">
                <MyButton classnames="hover:bg-gray-300">前往新增履歷</MyButton>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 text-slate-500">
        <div className="flex gap-1">
          電話號碼 <div className="text-xs text-red-500">*</div>
        </div>
        <div>
          <OutlinedInput
            fullWidth
            size="small"
            name="phone"
            error={errors.phone}
            value={formData.phone}
            onChange={handleTextChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 text-slate-500">
        <div className="flex gap-1">
          電子信箱 <div className="text-xs text-red-500">*</div>
        </div>
        <div>
          <OutlinedInput
            fullWidth
            size="small"
            name="email"
            error={errors.email}
            value={formData.email}
            onChange={handleTextChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 text-slate-500">
        <div className="flex gap-1">
          求職信 <div className="text-xs text-red-500">*</div>
        </div>
        <div>
          <OutlinedInput
            fullWidth
            size="small"
            minRows={10}
            maxRows={20}
            multiline
            error={errors.letter}
            placeholder="請說明為何您要應徵這個職缺，以及為何這家企業應該錄取您。如果有推薦人、某一項您想特別強調的技能、或者其他無法在履歷說明的內容也可以寫在求職信上。"
            name="letter"
            value={formData.letter}
            onChange={handleTextChange}
          />
        </div>
      </div>
      <div>
        <MyButton
          onClick={handleSubmit}
          disabled={appIsLoading}
          classnames="w-full text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
        >
          提交
        </MyButton>
      </div>
    </>
  );
};

export default ApplyForJobForm;
