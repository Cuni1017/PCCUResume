import SearchContainer from "../components/SearchContainer";

const JobsLayout = ({ children }: { children: React.ReactNode }) => {
  // const data = await fetchJobs();
  // console.log(data);

  return (
    <main className="px-5 md:p-0">
      <div className="max-w-[600px] md:max-w-none md:w-full mx-auto mt-5">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="w-full md:w-[80%]">
            <SearchContainer>{children}</SearchContainer>
          </div>
          <div className="w-full md:w-[20%]">最近瀏覽...</div>
        </div>
      </div>
    </main>
  );
};

export default JobsLayout;
