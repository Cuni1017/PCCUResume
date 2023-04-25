import React, { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import Link from "next/link";
import MyButton from "@/app/components/MyButton";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter, usePathname } from "next/navigation";

const AdminNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isReviewed, setIsReviewed] = useState(!pathname?.includes("/review"));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked === true && pathname?.includes("review")) {
      router.push(pathname!.replace("/review", ""));
    } else if (
      event.target.checked === false &&
      !pathname?.includes("review")
    ) {
      router.push(`${pathname}/review`);
    }
    setIsReviewed(event.target.checked);
  };

  useEffect(() => {
    if (pathname === "/admin" || pathname === "/admin/applies/review") {
      setIsReviewed(false);
    }
  }, [pathname]);

  return (
    <Card classnames="p-3 mt-5">
      <div className="flex flex-col gap-3">
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <Link href={`/admin/students${isReviewed ? "" : "/review"}`}>
              <MyButton classnames="hover:bg-gray-300 w-full">學生</MyButton>
            </Link>
          </div>
          <div>
            <Link href={`/admin/companies${isReviewed ? "" : "/review"}`}>
              <MyButton classnames="hover:bg-gray-300 w-full">公司</MyButton>
            </Link>
          </div>
          <div>
            <Link href={`/admin/vacancies${isReviewed ? "" : "/review"}`}>
              <MyButton classnames="hover:bg-gray-300 w-full">職缺</MyButton>
            </Link>
          </div>
          <div>
            <Link href={`/admin/applies/review`}>
              <MyButton classnames="hover:bg-gray-300 w-full">應徵</MyButton>
            </Link>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-full">
            <Link href={`/admin`}>
              <MyButton classnames="hover:bg-gray-300 w-full">近期</MyButton>
            </Link>
          </div>
          <div className="ml-auto">
            <FormGroup>
              <FormControlLabel
                className="whitespace-nowrap"
                control={
                  <Switch
                    checked={isReviewed}
                    disabled={
                      pathname === "/admin" ||
                      pathname === "/admin/applies/review"
                    }
                    onChange={handleChange}
                  />
                }
                label={isReviewed ? "已審核" : "未審核"}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminNavbar;
