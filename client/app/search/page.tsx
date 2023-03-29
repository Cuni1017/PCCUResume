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
    <div>
      搜尋{searchParams.q}的人才搜尋頁面
      <Link href="/search/test">Test</Link>
    </div>
  );
};

export default SearchPage;
