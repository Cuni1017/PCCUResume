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
  return (
    <Card>
      <div className="py-3">
        <div className="flex flex-col justify-center items-center mb-5">
          <div className="rounded-full overflow-hidden w-[70px] h-[70px] cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
              width={70}
              height={70}
              alt="cat"
              priority
            ></Image>
          </div>
          <div className="text-xl mt-1">{userInfo.name}</div>
        </div>
        <div className="px-4 flex flex-col items-center justify-center gap-3">
          <TextFiled
            label="信箱："
            name="email"
            value={userInfo.email}
            disabled
          />
          <TextFiled
            label="手機："
            name="email"
            value={userInfo.phone}
            disabled
          />
          <TextFiled label="學校：" name="email" value={userInfo.AQ} disabled />
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
