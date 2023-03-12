"use client";

import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import Link from "next/link";

const SearchHeader = () => {
  return (
    <div className="flex justify-between w-full">
      <h3 className="text-xl my-2">找實習</h3>
      <Link
        href="/dashboard/favorite-jobs"
        className="flex hover:underline text-blue-400"
      >
        <span className="flex items-center gap-2">
          <FolderCopyOutlinedIcon />
          儲存的職缺
        </span>
      </Link>
    </div>
  );
};

export default SearchHeader;
