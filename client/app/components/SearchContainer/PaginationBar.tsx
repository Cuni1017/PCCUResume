"use client";
import Pagination from "@mui/material/Pagination";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Props {
  count: number;
  page: number;
}

const PaginationBar = ({ count, page }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let searchParamsList = searchParams
    ?.toString()
    ?.split("&")
    .filter((x) => x);

  const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    let newSearchParamsList = searchParamsList ? [...searchParamsList] : [];

    newSearchParamsList = newSearchParamsList.filter(
      (searchParam) => !searchParam.includes("page=")
    );

    page === 1 ? null : newSearchParamsList?.push(`page=${page}`);
    router.push(`${pathname}?${newSearchParamsList?.join("&")}`);
  };

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
