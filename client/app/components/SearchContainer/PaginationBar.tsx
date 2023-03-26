"use client";
import Pagination from "@mui/material/Pagination";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useMemo, useEffect } from "react";

interface Props {
  count: number; // 總共頁數
  page: number; // 目前第幾頁
}

const PaginationBar = ({ count, page }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let searchParamsList = useMemo(
    () =>
      searchParams
        ?.toString()
        ?.split("&")
        .filter((x) => x),
    [searchParams]
  );

  useEffect(() => {
    if (count > 1 && page < count)
      router.prefetch(
        `${pathname}?${searchParamsList?.join("&")}&page=${page + 1}`
      );
  }, [count, page, pathname, router, searchParamsList]);

  const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    let newSearchParamsList = searchParamsList ? [...searchParamsList] : [];

    newSearchParamsList = newSearchParamsList.filter(
      (searchParam) => !searchParam.includes("page=")
    );

    page === 1 ? null : newSearchParamsList?.push(`page=${page}`);
    router.push(`${pathname}?${newSearchParamsList?.join("&")}`);
  };

  if (count === 0) return null;
  if (count < page) return null;
  return (
    <Pagination
      count={count}
      page={page}
      shape="rounded"
      onChange={handleChange}
    />
  );
};

export default PaginationBar;
