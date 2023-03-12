"use client";

import React from "react";
import Link from "next/link";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import BusinessIcon from "@mui/icons-material/Business";
import { usePathname } from "next/navigation";

const SwitchSection = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-3 text-sm">
      <Link
        href="/jobs"
        className={`flex items-center gap-1 ${
          pathname?.includes("/jobs") ? "text-blue-400" : ""
        }`}
      >
        <BusinessCenterIcon />
        <span className="whitespace-nowrap">職缺</span>
      </Link>
      <span className="text-slate-300">|</span>
      <Link
        href="/companies"
        className={`flex items-center gap-1 ${
          pathname?.includes("/companies") ? "text-blue-400" : ""
        }`}
      >
        <BusinessIcon />
        <span className="whitespace-nowrap">公司</span>
      </Link>
    </div>
  );
};

export default SwitchSection;
