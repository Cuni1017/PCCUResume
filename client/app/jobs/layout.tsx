import SearchContainer from "../components/SearchContainer";

const JobsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="px-5">
      <div className="max-w-[600px] md:max-w-none md:w-full mx-auto mt-5">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="w-full md:w-[80%]">
            <SearchContainer />
          </div>
          <div className="w-full md:w-[20%]">123</div>
        </div>
      </div>
    </main>
  );
};

export default JobsLayout;
