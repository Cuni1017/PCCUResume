"use client";

import { Store } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const HeaderNavigationBar = ({ companyName }: { companyName: string }) => {
  const pathnameList = usePathname()!.split("/");
  const page = pathnameList.length === 3 ? "/" : `/${pathnameList[3]}`;

  const { name } = useSelector((store: Store) => store.user);

  return (
    <>
      <Link href={`/companies/${companyName}`}>
        <div
          className={`p-2 px-3 ${
            page === "/"
              ? "border-solid border-0 border-b-2 border-blue-400"
              : ""
          }`}
        >
          關於
        </div>
      </Link>
      <Link href={`/companies/${companyName}/jobs`}>
        <div
          className={`p-2 px-3 ${
            page === "/jobs"
              ? "border-solid border-0 border-b-2 border-blue-400"
              : ""
          }`}
        >
          職缺
        </div>
      </Link>
      {name === decodeURI(companyName) && (
        <Link href={`/companies/${companyName}/applicants`}>
          <div
            className={`p-2 px-3 ${
              page === "/applicants"
                ? "border-solid border-0 border-b-2 border-blue-400"
                : ""
            }`}
          >
            應徵者
          </div>
        </Link>
      )}
    </>
  );
};

export default HeaderNavigationBar;
