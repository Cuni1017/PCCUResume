"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import LocationFilter from "./LocationFilter";
import SalaryFilter from "./SalaryFilter";
import SkillFilter from "./SkillFilter";

const debounce = (callback: any, time: number = 1500) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(args);
    }, time);
  };
};

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
    debounce((searchParamsList: Array<string[]>) => {
      const href = `${pathname}?` + searchParamsList[0]?.sort()?.join("&");
      router.push(href, { forceOptimisticNavigation: true });
    }, 800),
    [pathname]
  );

  useEffect(() => {
    if (!isInit) {
      debounceRouterPush(searchParamsList);
    }
    setIsInit(false);
  }, [debounceRouterPush, searchParamsList]);

  useEffect(() => {
    if (
      searchParams
        ?.toString()
        .split("&")
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
