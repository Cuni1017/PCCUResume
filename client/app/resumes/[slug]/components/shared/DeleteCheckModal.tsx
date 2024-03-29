import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MyButton from "@/app/components/MyButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #ddd",
  boxShadow: 24,
  // p: 4,
};

interface Props {
  open: boolean;
  onDelete: () => void;
  onClose: () => void;
}

const DeleteCheckModal = ({ open, onDelete, onClose }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div>
          <div className="font-bold text-xl text-center p-3">確定刪除嗎？</div>
          <hr />
          <div className="text-sm indent-8 p-3">
            資料刪除後無法還原喔！確定刪除？
          </div>
          <div className="flex justify-center gap-10 p-3">
            <MyButton
              onClick={onDelete}
              classnames="bg-[#e25555] hover:bg-red-800 text-white w-[100px]"
            >
              確定
            </MyButton>
            <MyButton
              onClick={onClose}
              classnames="hover:bg-gray-300 w-[100px]"
            >
              取消
            </MyButton>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteCheckModal;
