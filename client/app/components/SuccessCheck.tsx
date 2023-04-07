import React from "react";
import { motion } from "framer-motion";

interface Props {
  size: string; //width && height
}

const SuccessCheck = ({ size }: Props) => {
  return (
    <motion.div
      className={`max-h-[${size}] border-solid rounded-full p-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
      initial={{ backgroundColor: "#fff", color: "#1976d2" }}
      animate={{ backgroundColor: "#3b82f6", color: "#fff" }}
    >
      <svg
        className={`w-[${size}]`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
          d="M5 13l4 4L19 7"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></motion.path>
      </svg>
    </motion.div>
  );
};

export default SuccessCheck;
