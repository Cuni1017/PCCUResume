"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderNavigationBar = ({ companyName }: { companyName: string }) => {
  const pathnameList = usePathname()!.split("/");
  const page = pathnameList.length === 3 ? "/" : `/${pathnameList[3]}`;

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
    </>
  );
};

export default HeaderNavigationBar;
