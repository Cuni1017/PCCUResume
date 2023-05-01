import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import { useAuth } from "../../../hooks/useAuth";
import { CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 4,
  px: {
    sm: 1,
    md: 4,
  },
};

export default function AuthModal({ isSignin }: { isSignin: boolean }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
  });
  const [modalStatus, setModalStatus] = useState({
    loading: false,
    error: null,
  });
  const { signin, isFetching } = useAuth();

  const renderedContent = (signinContent: string, signupContent: string) => {
    return isSignin ? signinContent : signupContent;
  };

  const handleChangeInput = (name: string, value: string) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (isSignin) {
      signin(
        { username: inputs.username, password: inputs.password },
        handleClose
      );
    }
  };

  return (
    <>
      <Button variant={isSignin ? "text" : "contained"} onClick={handleOpen}>
        {renderedContent("登入", "註冊")}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <div className="uppercase font-bold text-center pb-2 border-0 border-b border-b-gray-200 border-solid">
              <h2 className="text-2xl text-center m-0 font-bold">
                {renderedContent("登入", "註冊")}
              </h2>
            </div>
            <div className="m-auto h-[500px] p-2">
              <AuthModalInputs
                inputs={inputs}
                handleChangeInput={handleChangeInput}
                isSignin={isSignin}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  marginTop: "1rem",
                  backgroundColor: "rgb(220,38,38)",
                  "&:hover": {
                    backgroundColor: "rgb(153,27,27)",
                  },
                }}
                className="text-lg disabled:bg-gray-300 h-12"
                type="submit"
                disabled={isFetching}
              >
                {isFetching ? (
                  <CircularProgress />
                ) : (
                  renderedContent("登入", "註冊")
                )}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
