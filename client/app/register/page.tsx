"use client";

import React, { useState } from "react";
import IdentityPicker from "./components/IdentityPicker";
import RegisterForm from "./components/RegisterForm";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormData } from "./components/RegisterForm";

const steps = ["選擇身分", "輸入資訊", "查收驗證碼"];

const RegisterPage = () => {
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

  console.log(formData);

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

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

  // const ImageWidth = ;

  let completedStep: number = 0;
  if (identity) completedStep++;

  return (
    <div className="mt-10 min-h-[650px] flex flex-col items-center pt-10">
      <Box
        sx={{ width: "90%", height: "100%" }}
        className="flex flex-col min-h-[650px]"
      >
        <Stepper activeStep={completedStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div className="grow">
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                Step {activeStep + 1}
              </Typography> */}
              {activeStep === 0 ? (
                <IdentityPicker
                  setIdentity={setIdentity}
                  handleNext={handleNext}
                  handleComplete={handleComplete}
                />
              ) : null}
              {activeStep === 1 ? (
                <RegisterForm
                  identity={identity}
                  formData={formData}
                  setFormData={setFormData}
                />
              ) : null}
            </React.Fragment>
          )}
        </div>
      </Box>
    </div>
  );
};

export default RegisterPage;
