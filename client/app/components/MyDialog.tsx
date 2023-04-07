import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MyDialog = ({ isOpen, onClose, children }: Props) => {
  return (
    <Dialog onClose={onClose} open={isOpen}>
      {/* <DialogTitle>Set backup account</DialogTitle> */}
      {children}
    </Dialog>
  );
};

export default MyDialog;
