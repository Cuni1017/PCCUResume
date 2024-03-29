"use client";

import { Store } from "@/redux/store";
import { useSelector } from "react-redux";
import UnAuthorizedPage from "../components/UnAuthorizedPage";
import NavigationSideBar from "./components/NavigationBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { id, name, role } = useSelector((store: Store) => store.user);

  if (
    !id ||
    !name ||
    (role !== "COMPANY" && window.location.pathname.includes("/companies"))
  )
    return <UnAuthorizedPage />;

  return (
    <main className="md:max-w-[860px] lg:max-w-[1140px] m-auto px-3 md:p-0">
      <div className="max-w-[600px] md:max-w-none md:w-full mx-auto mt-5">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-[30%]">
            <NavigationSideBar />
          </div>
          <div className="w-full md:w-[68%]">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
