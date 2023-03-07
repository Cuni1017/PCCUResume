"use client";

import React, { useEffect, useState } from "react";
import IdentityPicker from "./components/IdentityPicker";
import RegisterForm from "./components/RegisterForm";
import ValidateForm from "./components/ValidateForm";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import CheckIcon from "@mui/icons-material/Check";
import { FormData } from "./components/RegisterForm";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { Store } from "@/redux/store";
import { StepLabel } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

const steps = ["驗證信箱", "選擇身分", "輸入資訊"];

const RegisterPage = () => {
  const { signup, isFetching } = useAuth();
  const [identity, setIdentity] = useState<null | string>(null);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    name: "",
    email: "",
    pccuId: "",
    teacherId: "",
    companyName: "",
    companyTitle: "",
    companyNumber: "",
    companyCounty: "台北市",
    companyDistrict: "中正區",
    companyAddress: "",
  });
  const [activeStep, setActiveStep] = useState(2);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  console.log(formData);

  const handleSubmit = () => {
    if (!identity) return;
    signup({ ...formData, identity, handleNext, handleComplete });
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className="mt-10 min-h-[650px] flex flex-col items-center pt-10 bg-white relative">
      <div className="flex flex-col w-[90%] min-h-[600px]">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel color="inherit">{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="grow h-full">
          <div className="h-auto sm:h-[600px]">
            {allStepsCompleted() ? (
              <React.Fragment>
                <div className="mt-10 flex flex-col h-full">
                  <h1 className="m-5">註冊完成</h1>
                  <div className="grow">
                    <Link href="/">
                      <motion.div
                        className="max-h-[10rem] border-solid rounded-full p-10 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
                        initial={{ backgroundColor: "#fff", color: "#1976d2" }}
                        animate={{ backgroundColor: "#3b82f6", color: "#fff" }}
                      >
                        <svg
                          className="w-[10rem]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1 }}
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></motion.path>
                        </svg>
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {activeStep === 0 ? (
                  <ValidateForm
                    formData={formData}
                    setFormData={setFormData}
                    handleNext={handleNext}
                    handleComplete={handleComplete}
                  />
                ) : null}
                {activeStep === 1 ? (
                  <IdentityPicker
                    setIdentity={setIdentity}
                    handleNext={handleNext}
                    handleComplete={handleComplete}
                  />
                ) : null}
                {activeStep === 2 ? (
                  <RegisterForm
                    identity={identity}
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    isFetching={isFetching}
                    handleBack={handleBack}
                  />
                ) : null}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
