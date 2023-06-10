import Link from "next/link";

const fetchTest = async () => {
  const res = await fetch("http://localhost:8080/vacancies", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

const SearchPage = async (props: any) => {
  const { params, searchParams } = props;

  const res = await fetchTest();
  console.log(res);

  return (
    <main className="md:max-w-[860px] lg:max-w-[1140px] m-auto px-3 md:p-0">
      <div className="max-w-[600px] md:max-w-none md:w-full mx-auto mt-5">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="w-full md:w-[80%]">
            搜尋人才頁面
            {/* <SearchContainer>{children}</SearchContainer> */}
          </div>
          <div className="w-full md:w-[20%]">搜尋技巧</div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
