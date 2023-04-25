"use client";

import { Store } from "@/redux/store";
import { useSelector } from "react-redux";
import PaginationBar from "../components/SearchContainer/PaginationBar";
import UnAuthorizedPage from "../components/UnAuthorizedPage";
import AdminNavbar from "./components/AdminNavbar";


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { id, name, role } = useSelector((store: Store) => store.user);

  if (role !== "TEACHER") return <UnAuthorizedPage />;

  return (
    <main className="md:max-w-[860px] lg:max-w-[1140px] m-auto px-3 md:p-0">
      <AdminNavbar />
      <div className="mt-5">{children}</div>
    </main>
  );
};

export default AdminLayout;
