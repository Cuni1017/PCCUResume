"use client";

import Link from "next/link";
import MyButton from "../../../../components/MyButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useSelector } from "react-redux";
import { Store } from "@/redux/store";

const ContentAction = ({ companyName }: { companyName: string }) => {
  const { name } = useSelector((store: Store) => store.user);

  if (name !== decodeURI(companyName)) return <></>;

  return (
    <>
      <Link href={`/companies/${companyName}/edit`}>
        <MyButton classnames="bg-inherit hover:bg-gray-200 flex h-[2rem] items-center gap-2">
          <EditOutlinedIcon />
          <div className="hidden sm:block">編輯公司資訊</div>
        </MyButton>
      </Link>
      <Link href={`/companies/${companyName}/setting`}>
        <MyButton classnames="bg-inherit hover:bg-gray-200 flex h-[2rem] items-center gap-2">
          <SettingsOutlinedIcon />
          <div className="hidden sm:block">設定</div>
        </MyButton>
      </Link>
    </>
  );
};

export default ContentAction;
