"use client";

import React from "react";
import Card from "@/app/components/Card";
import { CompanyAbout } from "../../page";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

function formatNumber(number: number) {
  var formattedNumber = parseFloat(number.toFixed(2)).toString();
  return formattedNumber.replace(/(\.\d*?[1-9])0+$/g, "$1").replace(/\.$/, "");
}
const getMoneyText = (money: number) => {
  // companyAboutHaveMoney 單位為萬
  if (money >= 10000) {
    return `${formatNumber(money / 10000)} 億`;
  }
  return `${money} 萬`;
};

const CompanyUrlClassnames =
  "p-1 bg-inherit hover:bg-gray-300 flex items-center jusitfy-center rounded";

// CompanyAbout
const CompanyInfoCard = ({ companyInfo }: { companyInfo: CompanyAbout }) => {
  const {
    companyTitle, //行業類別
    companyCounty,
    companyDistrict,
    companyAddress,
    companyAboutBasic,
    companyAboutService,
  } = companyInfo;

  const fullAddress = `${companyCounty}${companyDistrict}${companyAddress}`;

  return (
    <Card classnames="p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm">
        <Tooltip title="行業類別">
          <div className="cursor-pointer flex items-center">
            <BusinessCenterOutlinedIcon />
          </div>
        </Tooltip>
        <div>{companyTitle}</div>
      </div>
      {companyAboutBasic?.companyAboutEmployeeQuantity && (
        <div className="flex items-center gap-2 text-sm">
          <Tooltip title="員工人數">
            <div className="cursor-pointer flex items-center">
              <GroupsOutlinedIcon />
            </div>
          </Tooltip>
          <div>{companyAboutBasic.companyAboutEmployeeQuantity}</div>
        </div>
      )}
      {companyAboutBasic?.companyAboutHaveMoney && (
        <div className="flex items-center gap-2 text-sm">
          <Tooltip title="資本額">
            <div className="cursor-pointer flex items-center">
              <AccountBalanceOutlinedIcon />
            </div>
          </Tooltip>
          <div>${getMoneyText(companyAboutBasic.companyAboutHaveMoney)}</div>
        </div>
      )}
      <div className="flex items-center gap-2 text-sm">
        <Tooltip title="地址">
          <div className="cursor-pointer flex items-center">
            <PlaceOutlinedIcon />
          </div>
        </Tooltip>
        <div>
          <a
            className="text-blue-500 hover:underline"
            href={`https://maps.google.com/?q=${fullAddress}`}
            target="_blank"
          >
            {fullAddress}
          </a>
        </div>
      </div>
      {companyAboutBasic?.companyAboutUrl ? (
        <div className="flex items-center gap-2 text-sm">
          <Tooltip title="網站">
            <div className="cursor-pointer flex items-center">
              <LanguageOutlinedIcon />
            </div>
          </Tooltip>
          <div>
            <a
              className="text-blue-500 hover:underline"
              href={companyAboutBasic.companyAboutUrl}
              target="_blank"
            >
              {companyAboutBasic.companyAboutUrl}
            </a>
          </div>
        </div>
      ) : null}

      <div className="flex gap-2 flex-wrap">
        {companyAboutService?.companyFacebookUrl &&
          companyAboutService.companyFacebookUrl.includes(
            "www.facebook.com"
          ) && (
            <Link
              className={CompanyUrlClassnames}
              href={`https://www.facebook.com/${companyAboutService.companyFacebookUrl}`}
              target="_blank"
            >
              <FacebookOutlinedIcon fontSize="inherit" />
            </Link>
          )}
        {companyAboutService?.companyTwitterUrl &&
          companyAboutService.companyTwitterUrl.includes("twitter.com") && (
            <Link
              href={companyAboutService.companyTwitterUrl}
              target="_blank"
              className={CompanyUrlClassnames}
            >
              <TwitterIcon fontSize="inherit" />
            </Link>
          )}
        {companyAboutService?.companyInstagramUrl && (
          <Link
            href={companyAboutService.companyInstagramUrl}
            target="_blank"
            className={CompanyUrlClassnames}
          >
            <InstagramIcon fontSize="inherit" />
          </Link>
        )}
      </div>
    </Card>
  );
};

export default CompanyInfoCard;
