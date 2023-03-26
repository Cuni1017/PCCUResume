"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import LocationFilter from "./LocationFilter";
import SalaryFilter from "./SalaryFilter";
import SkillFilter from "./SkillFilter";
import { debounce } from "@/util/debounce";

const SearchFilterContainer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isInit, setIsInit] = useState(true);
  const [searchParamsList, setSearchParamsList] = useState(
    searchParams
      ?.toString()
      .split("&")
      .filter((x) => x)
  );

  const debounceRouterPush = useCallback(
    debounce((searchParamsList: string[]) => {
      const href = `${pathname}?` + searchParamsList.sort().join("&");
      console.log("index router push");
      router.push(href, { forceOptimisticNavigation: true });
    }, 800),
    [pathname]
  );

  useEffect(() => {
    if (!isInit) {
      // debounceRouterPush(searchParamsList);
    }
    setIsInit(false);
  }, [debounceRouterPush, searchParamsList]);

  useEffect(() => {
    if (
      searchParams
        ?.toString()
        .split("&")
        .filter((searchParam) => !searchParam.includes("page="))
        .filter((x) => x) !== searchParamsList
    )
      setSearchParamsList(
        searchParams
          ?.toString()
          .split("&")
          .filter((x) => x)
      );
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm">篩選條件</div>
      <div className="md:flex gap-2 flex-wrap justify-between md:justify-start grid grid-cols-2">
        <button
          onClick={async () => {
            try {
              console.log(router.push);
              await router.push(`/jobs/${Math.floor(Math.random() * 100)}`);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Test
        </button>
        <LocationFilter
          searchParamsList={searchParamsList}
          setSearchParamsList={setSearchParamsList}
        />
        <SalaryFilter />
        <SkillFilter
          searchParamsList={searchParamsList}
          setSearchParamsList={setSearchParamsList}
        />
      </div>
    </div>
  );
};

export default SearchFilterContainer;
