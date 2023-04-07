import React from "react";
import MyDialog from "@/app/components/MyDialog";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  applyType: "應徵中" | "面試中" | "待學生同意中" | "實習中";
}

const ApplyActionDIalog = ({ isOpen, onClose }: Props) => {
  return (
    <MyDialog isOpen={isOpen} onClose={onClose}>
      <div className="p-5">Dialog</div>
    </MyDialog>
  );
};

export default ApplyActionDIalog;
