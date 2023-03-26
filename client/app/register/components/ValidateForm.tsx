import React, { ChangeEvent, useState, useCallback } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { axiosInstanceNext } from "@/axiosInstance.ts";
import { FormData } from "./RegisterForm";

const ValidateForm = ({
  formData,
  setFormData,
  handleNext,
  handleComplete,
}: {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleNext: () => void;
  handleComplete: () => void;
}) => {
  const [CAPTCHA, setCAPTCHA] = useState("");
  const [resendTime, setResendTime] = useState(0);
  const [sending, setSending] = useState(false);
  const [sendTimes, setSendTimes] = useState(0); //至少寄一次才可以按提交

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "CAPTCHA") setCAPTCHA(e.target.value);
    else if (e.target.name === "email")
      setFormData({ ...formData, email: e.target.value });
  };

  const setResendTimeFn = useCallback(() => {
    const waitTime = 60;
    setResendTime(waitTime);
    const resendInterval = setInterval(() => {
      setResendTime((prev) => prev - 1);
    }, 1000);
    setTimeout(() => clearInterval(resendInterval), waitTime * 1000);
  }, []);

  const handleSend = async () => {
    setSendTimes((prev) => prev + 1);
    setSending(true);
    try {
      const response = await axiosInstanceNext.post("/api/auth/emailValidate", {
        email: formData.email,
      });
      alert(response.data.message);
      setResendTimeFn();
    } catch (error) {
      alert("要求寄送失敗");
      console.log(error);
    }
    setSending(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstanceNext.post("/api/auth/emailValidate", {
        email: formData.email,
        CAPTCHA,
      });
      if (response.status === 200) {
        handleNext();
        handleComplete();
      }
    } catch (error) {
      alert("驗證碼錯誤");
      console.log(error);
    }
  };

  const sendMailBtnContent = () => {
    if (sending) return <CircularProgress />;
    if (resendTime !== 0) return resendTime.toString();
    return "寄送驗證碼";
  };

  return (
    <div className="mt-10 flex flex-col h-full">
      <h1 className="m-5">請輸入信箱</h1>
      <div className="flex flex-col items-center">
        <TextField
          label="信箱"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ width: "100%", maxWidth: "500px" }}
        />
        <br />
        <div className="flex w-full justify-between max-w-[500px] gap-2">
          <TextField
            label="驗證碼"
            variant="outlined"
            name="CAPTCHA"
            value={CAPTCHA}
            onChange={handleChange}
            disabled={sendTimes === 0}
            sx={{ width: "100%", maxWidth: "385px" }}
          />
          <Button
            variant="contained"
            color="info"
            onClick={handleSend}
            disabled={
              resendTime !== 0 ||
              sending ||
              !formData.email.includes(".com") ||
              !formData.email.includes("@")
            }
            sx={{ width: "100%", maxWidth: "115px" }}
          >
            {sendMailBtnContent()}
          </Button>
        </div>
      </div>
      <div className="mt-2 flex justify-center items-center gap-4">
        {/* <span>沒有收到驗證碼？</span> */}
      </div>
      <div className="h-[300px]"></div>
      <Button
        onClick={handleSubmit}
        variant="contained"
        className="mt-auto mb-10"
        disabled={
          CAPTCHA.length < 6 ||
          !formData.email.includes(".com") ||
          !formData.email.includes("@") ||
          sendTimes === 0
        }
      >
        提交
      </Button>
    </div>
  );
};

export default ValidateForm;
