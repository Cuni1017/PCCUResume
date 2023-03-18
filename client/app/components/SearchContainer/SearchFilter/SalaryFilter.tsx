"use client";

import { ChangeEvent, useCallback, useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import OutlinedInput from "@mui/material/OutlinedInput";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import SearchFilterModel from "./shared/Model";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
  return `${value} TWD`;
}

const debounce = (callback: any, time: number) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(args);
    }, time);
  };
};

const maxSalary = 10000000;

const SalaryFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [salaryRange, setSalaryRange] = useState<number[]>([0, maxSalary]);
  let searchParamsList = useMemo(
    () =>
      searchParams
        ?.toString()
        ?.split("&")
        .filter((x) => x),
    [searchParams]
  );

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSalaryRange(newValue as number[]);
  };

  useEffect(() => {
    if (!searchParams) return;
    const minValue = parseInt(searchParams.get("salary_range[min]") || "0");
    const maxValue = parseInt(
      searchParams.get("salary_range[max]") || "10000000"
    );
    if (minValue !== salaryRange[0] || maxValue !== salaryRange[1])
      setSalaryRange([minValue, maxValue]);
  }, [searchParams]);

  useEffect(() => {
    debounceSalaryRangeChange(salaryRange);
  }, [salaryRange]);

  const debounceSalaryRangeChange = useCallback(
    debounce((params: Array<number[]>) => {
      let newSearchParamsList = searchParamsList ? [...searchParamsList] : [];
      if (!searchParams || !newSearchParamsList) return;
      const minIndex = newSearchParamsList.findIndex((searchParam) =>
        searchParam.includes(encodeURI("salary_range[min]"))
      );
      const maxIndex = newSearchParamsList.findIndex((searchParam) =>
        searchParam.includes(encodeURI("salary_range[max]"))
      );

      params[0][0] === 0
        ? (newSearchParamsList = newSearchParamsList.filter(
            (searchParam) =>
              !searchParam.includes(encodeURI("salary_range[min]"))
          ))
        : minIndex === -1
        ? newSearchParamsList.push(
            encodeURI(`salary_range[min]=${params[0][0]}`)
          )
        : newSearchParamsList.splice(
            minIndex,
            1,
            encodeURI(`salary_range[min]=${params[0][0]}`)
          );

      params[0][1] === maxSalary || params[0][1] === 0
        ? (newSearchParamsList = newSearchParamsList.filter(
            (searchParam) =>
              !searchParam.includes(encodeURI("salary_range[max]"))
          ))
        : maxIndex === -1
        ? newSearchParamsList.push(
            encodeURI(`salary_range[max]=${params[0][1]}`)
          )
        : newSearchParamsList.splice(
            maxIndex,
            1,
            encodeURI(`salary_range[max]=${params[0][1]}`)
          );

      router.push(`${pathname}?${newSearchParamsList?.join("&")}`);
    }, 800),
    [pathname, searchParamsList]
  );

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = [...salaryRange];
    e.target.name === "salary_range[min]"
      ? (newValue[0] = parseInt(e.target.value) | 0)
      : (newValue[1] = parseInt(e.target.value) | 0);

    if (newValue[0] < 0) newValue[0] = 0;
    if (newValue[1] > maxSalary) newValue[1] = maxSalary;
    setSalaryRange(newValue);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let salaryTypeIndex = searchParamsList!.findIndex((searchParam) =>
      searchParam.includes(e.target.name)
    );

    if (!searchParamsList) return;

    if (salaryTypeIndex !== -1)
      e.target.value === "All"
        ? searchParamsList.splice(salaryTypeIndex, 1)
        : (searchParamsList[
            salaryTypeIndex
          ] = `${e.target.name}=${e.target.value}`);
    else searchParamsList.push(`${e.target.name}=${e.target.value}`);

    const href = `${pathname}?` + searchParamsList?.join("&");
    router.push(href);
  };

  const handleCancelSalaryFilter = () => {
    searchParamsList = searchParamsList?.filter(
      (searchParam) =>
        !searchParam.includes("salary_type") &&
        !searchParam.includes("salary_currency") &&
        !searchParam.includes(encodeURI("salary_range[min]")) &&
        !searchParam.includes(encodeURI("salary_range[max]"))
    );

    const href = `${pathname}?` + searchParamsList?.join("&");
    router.push(href);
  };

  return (
    <SearchFilterModel label="薪資" align="right-0 md:left-0 md:w-[450px]">
      <div className="min-w-[260px] sm:w-[300px] md:w-[400px] h-[150px] p-6 overflow-hidden flex flex-col justify-between">
        <div className="flex gap-3">
          <select
            className="w-full h-[40px] text-sm md:text-lg px-2 border-gray-300 hover:border-gray-500 focus:border-blue-500 focus:outline-none cursor-pointer rounded-md"
            name="salary_type"
            value={searchParams!.get("salary_type") || "All"}
            onChange={handleSelectChange}
          >
            <option value="All">薪酬類型</option>
            <option value="per_hour">時</option>
            <option value="per_month">月</option>
          </select>
          <select
            className="w-full h-[40px] text-sm md:text-lg px-2 border-gray-300 hover:border-gray-500 focus:border-blue-500 focus:outline-none cursor-pointer rounded-md"
            name="salary_currency"
            value={searchParams!.get("salary_currency") || "All"}
            onChange={handleSelectChange}
          >
            <option value="All">幣別</option>
            <option value="TWD">台幣</option>
          </select>
          <button
            className="flex items-center cursor-pointer bg-inherit border-none"
            onClick={handleCancelSalaryFilter}
          >
            <DeleteForeverSharpIcon />
          </button>
        </div>
        <div className="px-2">
          <Slider
            getAriaLabel={() => "Salary range"}
            value={salaryRange}
            min={0}
            max={10000000}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </div>
        <div className="flex items-center justify-between">
          <OutlinedInput
            value={salaryRange[0] === 0 ? "" : salaryRange[0]}
            size="small"
            name="salary_range[min]"
            sx={{ width: "100%", maxWidth: "180px" }}
            placeholder="0"
            onChange={handleTextChange}
          />
          <RemoveIcon />
          <OutlinedInput
            value={
              salaryRange[1] === maxSalary || salaryRange[1] === 0
                ? ""
                : salaryRange[1]
            }
            size="small"
            name="salary_range[max]"
            sx={{ width: "100%", maxWidth: "180px" }}
            placeholder="10,000,000"
            onChange={handleTextChange}
          />
        </div>
      </div>
    </SearchFilterModel>
  );
};

export default SalaryFilter;
