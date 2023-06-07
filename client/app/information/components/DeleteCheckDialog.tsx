import MyDialog from "@/app/components/MyDialog";
import Button from "@mui/material/Button";
import React from "react";

const DeleteCheckDialog = ({
  title,
  isOpen,
  onClose,
  onDelete,
}: {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}) => {
  return (
    <MyDialog isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="min-w-[20rem]">
        <div className="px-4">
          <h3>{title ? title : "確定刪除嗎？"}</h3>
        </div>
        <hr className="w-full m-0 p-0" />
        <div className="p-4 grid grid-cols-2 gap-4">
          <Button variant="contained" color="error" onClick={onDelete}>
            刪除
          </Button>
          <Button color="primary" onClick={onClose}>
            取消
          </Button>
        </div>
      </div>
    </MyDialog>
  );
};

export default DeleteCheckDialog;
