"use client";

import Link from "next/link";
import Image from "next/image";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { getSalaryText } from "@/util/getSalaryText";
import { Vacancy } from "@/app/components/JobInfoCard";
import Tooltip from "@mui/material/Tooltip";

interface Props {
  vacancy: Vacancy;
}

const TinyJobInfoCard = ({ vacancy }: Props) => {
  return (
    <div className="flex gap-3 bg-gray-100 p-3">
      <div className="relative min-w-[2.5rem] h-[2.5rem] border-solid border border-[#e2e6e4] cursor-pointer">
        <Image src="/PCCUResume.png" alt="companyLogo" fill sizes="100%" />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex w-full">
          <div className="flex flex-col w-full">
            <Link
              href={`/companies/台大公司/jobs/V001`}
              className="text-sm text-blue-500 hover:underline mb-0.5"
            >
              資深前端工程師
            </Link>
            <Link
              href={`/companies/台大公司`}
              className="text-xs hover:underline"
            >
              統一數網股份有限公司
            </Link>
          </div>
          <div>
            <Tooltip title="儲存職缺">
              <button className="bg-gray-200 hover:bg-gray-300 border-none rounded cursor-pointer flex items-center justify-center">
                <BookmarkBorderOutlinedIcon />
              </button>
            </Tooltip>
          </div>
        </div>
        <div className="text-xs">
          ＄ {getSalaryText({ type: "month", min: 50000, max: 70000 })}
        </div>
      </div>
    </div>
  );
};

export default TinyJobInfoCard;
