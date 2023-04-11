import React from "react";
import TextField from "@mui/material/TextField";
import AuthTextField from "./AuthTextField";

interface Props {
  inputs: {
    username: string;
    password: string;
    name: string;
    email: string;
  };
  handleChangeInput: (name: string, value: string) => void;
  isSignin: boolean;
}

const AuthModalInputs = ({ inputs, handleChangeInput, isSignin }: Props) => {
  return (
    <div className="w-full">
      <div className="mt-4 flex flex-col gap-4">
        <AuthTextField
          id="username"
          label="Username"
          variant="outlined"
          name="username"
          value={inputs.username}
          autoComplete="username"
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            handleChangeInput(e.target.name, e.target.value);
          }}
        />
        <AuthTextField
          id="password"
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          value={inputs.password}
          autoComplete="current-password"
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            handleChangeInput(e.target.name, e.target.value);
          }}
        />
        {isSignin ? null : (
          <>
            <AuthTextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              value={inputs.email}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                handleChangeInput(e.target.name, e.target.value);
              }}
            />
            <AuthTextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              value={inputs.name}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                handleChangeInput(e.target.name, e.target.value);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModalInputs;
