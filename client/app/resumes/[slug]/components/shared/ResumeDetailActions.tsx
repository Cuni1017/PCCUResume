import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteCheckModal from "./DeleteCheckModal";

interface Props {
  onEditClick: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const ResumeDetailActions = ({ onEditClick, onDelete, onClose }: Props) => {
  const [open, setOpen] = useState(false); //deleteModal

  return (
    <>
      <div className="cursor-pointer hover:text-gray-800" onClick={onEditClick}>
        <EditIcon />
      </div>
      <div
        className="cursor-pointer hover:text-red-800"
        onClick={() => setOpen(true)}
      >
        <DeleteIcon />
      </div>
      <DeleteCheckModal
        open={open}
        onDelete={onDelete}
        onClose={() => {
          setOpen(false);
          onClose();
        }}
      />
    </>
  );
};
export default ResumeDetailActions;
