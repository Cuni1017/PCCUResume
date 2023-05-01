"use client";

import React, { useState } from "react";
import Card from "@/app/components/Card";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MyButton from "@/app/components/MyButton";
import { DoubleCheckDialog } from "@/app/companies/[slug]/applicants/components/ApplyActionDialog";
import { ImageDialog } from "@/app/companies/[slug]/applicants/components/ApplyActionDialog";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePutCompany } from "@/hooks/useAdmin";
import { Store } from "@/redux/store";

export interface Company {
  companyId: string;
  companyName: string;
  companyUsername: string;
  companyPassword: string;
  companyEmail: string;
  companyTitle: string;
  companyNumber: string | null;
  companyImageUrl: string | null;
  companyCounty: string;
  companyDistrict: string;
  companyAddress: string;
  companyCreateTime: string; //YYYY-MM-DD
  companyValidType: null | boolean; //這啥
}

const CompanyRegistCard = ({ company }: { company: Company }) => {
  const [isShowActions, setIsShowActions] = useState(false);
  const [isShowHeadshot, setIsShowHeadShot] = useState(false);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);

  const { mutate, isSuccess, isLoading } = usePutCompany(company.companyId);
  const { id } = useSelector((store: Store) => store.user);

  const {
    companyName,
    companyUsername,
    companyEmail,
    companyTitle,
    companyNumber,
    companyImageUrl,
    companyCounty,
    companyDistrict,
    companyAddress,
    companyCreateTime,
  } = company;

  const handleAgree = () => {
    mutate({ teacherId: id, companyId: company.companyId, role: "COMPANY" });
  };

  const handleDelete = () => {
    mutate({ teacherId: id, companyId: company.companyId, role: "DELETE" });
  };

  return (
    <Card
      classnames="p-3 flex flex-col gap-2 relative hover:bg-gray-200"
      onMouseEnter={() => setIsShowActions(true)}
      onMouseLeave={() => setIsShowActions(false)}
    >
      {companyImageUrl && (
        <ImageDialog
          imageURL={companyImageUrl}
          isOpen={isShowHeadshot}
          onClose={() => setIsShowHeadShot(false)}
        />
      )}
      <DoubleCheckDialog
        title={"確認刪除？"}
        content={"將直接刪除公司帳號。"}
        isOpen={isDeleteModalShow}
        isLoading={isLoading}
        onSure={handleDelete}
        onClose={() => setIsDeleteModalShow(false)}
        type="danger"
      />
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          {companyImageUrl ? (
            <IconButton onClick={() => setIsShowHeadShot(true)}>
              <Avatar
                alt={companyName}
                src={companyImageUrl ? companyImageUrl : "/PCCUResume.png"}
              />
            </IconButton>
          ) : (
            <Avatar
              className="p-2"
              alt={companyName}
              src={companyImageUrl ? companyImageUrl : "/PCCUResume.png"}
            />
          )}
          <Link
            href={`/companies/${companyName}`}
            target="_blank"
            className="text-lg hover:underline"
          >
            {companyName}
          </Link>
        </div>
        <div className="text-slate-500 text-sm">
          <Tooltip title="註冊時間">
            <div className="cursor-pointer">{companyCreateTime}</div>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row">
          <div className="font-bold">帳號：</div>
          <div>{companyUsername}</div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="font-bold">行業：</div>
          <div>{companyTitle}</div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="font-bold">信箱：</div>
          <div>{companyEmail}</div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="font-bold">電話：</div>
          <div>{companyNumber}</div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="font-bold">地址：</div>
          <div>
            {companyCounty}
            {companyDistrict}
            {companyAddress}
          </div>
        </div>
      </div>
      <div
        className={`bottom-5 right-5 flex flex-col md:flex-row gap-2 ${
          isShowActions ? "absolute" : "hidden"
        }`}
      >
        <MyButton
          onClick={handleAgree}
          classnames="text-white bg-green-500 hover:bg-green-600 focus:bg-green-700 w-[10rem] h-[40px]"
        >
          同意
        </MyButton>
        <MyButton
          onClick={() => {
            setIsDeleteModalShow(true);
            setIsShowActions(false);
          }}
          classnames="text-white bg-red-500 hover:bg-red-600 focus:bg-red-700 w-[10rem] h-[40px]"
        >
          刪除
        </MyButton>
      </div>
    </Card>
  );
};

export default CompanyRegistCard;
