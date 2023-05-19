"use client";

import React from "react";
import Card from "@/app/components/Card";
import { CompanyAbout } from "../../page";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Tooltip from "@mui/material/Tooltip";

// CompanyAbout
const CompanyInfoCard = ({ companyAbout }: { companyAbout: any }) => {
  const { haveMoney, employeeQuantity, aboutUrl, address } = companyAbout; //缺地址

  return (
    <Card classnames="p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm">
        <Tooltip title="員工人數">
          <div className="cursor-pointer flex items-center">
            <GroupsOutlinedIcon />
          </div>
        </Tooltip>
        <div>{employeeQuantity}</div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Tooltip title="資本額">
          <div className="cursor-pointer flex items-center">
            <AccountBalanceOutlinedIcon />
          </div>
        </Tooltip>
        <div>${haveMoney} 萬</div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Tooltip title="地址">
          <div className="cursor-pointer flex items-center">
            <PlaceOutlinedIcon />
          </div>
        </Tooltip>
        <div>
          <a
            className="text-blue-500 hover:underline"
            href={`https://maps.google.com/?q=${address}`}
            target="_blank"
          >
            {address}
          </a>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Tooltip title="網站">
          <div className="cursor-pointer flex items-center">
            <GroupsOutlinedIcon />
          </div>
        </Tooltip>
        <div>
          <a
            className="text-blue-500 hover:underline"
            href={aboutUrl}
            target="_blank"
          >
            {aboutUrl}
          </a>
        </div>
      </div>
    </Card>
  );
};

export default CompanyInfoCard;
