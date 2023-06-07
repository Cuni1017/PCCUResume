import { User } from "@/redux/slices/user";
import { useAuth } from "../../../hooks/useAuth";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Profile = ({
  user,
  isProfileMenuShow,
}: {
  user: User;
  isProfileMenuShow: boolean;
}) => {
  const { signout } = useAuth();
  const { role, name, imageURL } = user;

  return (
    <div
      className={`flex items-center px-2 py-1 ${
        isProfileMenuShow ? "bg-gray-100" : ""
      }`}
    >
      <div className="mr-1 h-full flex items-center">
        <div className="rounded-full flex items-center overflow-hidden">
          <Image
            src={imageURL ? imageURL : "/PCCUResume.png"}
            width={35}
            height={35}
            alt={name}
          ></Image>
        </div>
        <div className="ml-1 hidden sm:block text-sm">{name}</div>
        <ExpandMoreIcon />
        {isProfileMenuShow ? (
          <div className="absolute top-16 right-0 cursor-auto z-10">
            <div className="bg-white flex flex-col gap-2 rounded-sm py-2 w-48 shadow">
              <ProfileMenuItem>
                <Link href="/dashboard">
                  <div>主控台</div>
                </Link>
              </ProfileMenuItem>
              {role.includes("STUDENT") && (
                <>
                  <ProfileMenuItem>
                    <Link href="/dashboard/resumes">
                      <div>我的履歷</div>
                    </Link>
                  </ProfileMenuItem>
                  <ProfileMenuItem>
                    <Link href="/dashboard/applications-jobs">
                      <div>應徵的職缺</div>
                    </Link>
                  </ProfileMenuItem>
                </>
              )}
              {role.includes("COMPANY") && (
                <ProfileMenuItem>
                  <Link href="/dashboard/companies">
                    <div>我的公司</div>
                  </Link>
                </ProfileMenuItem>
              )}
              {role === "TEACHER" && (
                <ProfileMenuItem>
                  <Link href="/admin">
                    <div>教師管理</div>
                  </Link>
                </ProfileMenuItem>
              )}
              <ProfileMenuItem>
                <Link href="/dashboard/favorite-jobs">
                  <div>儲存的職缺</div>
                </Link>
              </ProfileMenuItem>
              <ProfileMenuItem>
                <div onClick={signout}>登出</div>
              </ProfileMenuItem>
            </div>
          </div>
        ) : null}
      </div>
      <div></div>
    </div>
  );
};

const ProfileMenuItem = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`${
        active ? "bg-gray-100" : ""
      } py-2 px-3 text-sm cursor-pointer`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {children}
    </div>
  );
};

export default Profile;
