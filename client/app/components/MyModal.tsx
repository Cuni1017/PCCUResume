"use client";

import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0 none",
  boxShadow: 24,
  p: 4,
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MyModal = ({ isOpen, onClose, children }: Props) => {
  return (
    <div>
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={style}>
          <div
            className="absolute right-3 top-3 hover:bg-gray-200 cursor-pointer h-[1.5rem] w-[1.5rem] flex items-center justify-center"
            onClick={onClose}
          >
            <CloseIcon />
          </div>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default MyModal;
