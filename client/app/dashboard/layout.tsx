import NavigationSideBar from "./components/NavigationBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="px-5 md:p-0">
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
