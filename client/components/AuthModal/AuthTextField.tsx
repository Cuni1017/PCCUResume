import React from "react";
import TextField from "@mui/material/TextField";

const AuthTextField = ({ ...rest }) => {
  return (
    <TextField
      {...rest}
      InputLabelProps={{
        style: {
          top: "-3px",
        },
      }}
      inputProps={{
        style: {
          height: "14px",
        },
      }}
      fullWidth
    />
  );
};

export default AuthTextField;
