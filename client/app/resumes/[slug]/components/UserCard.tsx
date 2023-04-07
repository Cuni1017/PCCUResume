import React from "react";
import Card from "../../../components/Card";
import Image from "next/image";
import TextFiled from "./shared/TextFiled";

const UserCard = ({
  userInfo,
}: {
  userInfo: {
    name: string;
    email: string;
    phone: string;
    headshot: string;
    AQ: string;
  };
}) => {
  const { name, email, phone, headshot, AQ } = userInfo;
  return (
    <Card>
      <div className="py-3">
        <div className="flex flex-col justify-center items-center mb-5">
          <div className="rounded-full overflow-hidden w-[70px] h-[70px] cursor-pointer">
            <Image
              src={headshot ? headshot : "/PCCUResume.png"}
              width={70}
              height={70}
              alt="cat"
              priority
            ></Image>
          </div>
          <div className="text-xl mt-1">{name}</div>
        </div>
        <div className="px-4 flex flex-col items-center justify-center gap-3">
          <TextFiled
            label="信箱："
            name="email"
            value={email || "請至主控台設定個人檔案"}
            disabled
          />
          <TextFiled
            label="手機："
            name="email"
            value={phone || "請至主控台設定個人檔案"}
            disabled
          />
          <TextFiled
            label="學歷："
            name="email"
            value={AQ || "請至主控台設定個人檔案"}
            disabled
          />
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
