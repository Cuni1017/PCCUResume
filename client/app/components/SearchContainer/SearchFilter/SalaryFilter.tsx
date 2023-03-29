"use client";

import { ChangeEvent, useCallback, useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import OutlinedInput from "@mui/material/OutlinedInput";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import SearchFilterModel from "./shared/Model";
import Slider from "@mui/material/Slider";
import { debounce } from "@/util/debounce";

function valuetext(value: number) {
  return `${value} TWD`;
}

const maxSalary = 10000000;

const SalaryFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [salaryRange, setSalaryRange] = useState<number[]>([0, maxSalary]);
  const searchParamsList = useMemo(
    () =>
      searchParams
        ?.toString()
        ?.split("&")
        .filter((x) => x),
    [searchParams]
  );

  useEffect(() => {
    if (!searchParams) return;
    const minValue = parseInt(searchParams.get("salary_range[min]") || "0");
    const maxValue = parseInt(
      searchParams.get("salary_range[max]") || `${maxSalary}`
    );
    if (minValue !== salaryRange[0] || maxValue !== salaryRange[1])
      setSalaryRange([minValue, maxValue]);
  }, [searchParams]);

  const debounceSalaryRangeChange = useCallback(
    debounce((salaryRange: number[]) => {
      let newSearchParamsList = searchParamsList ? [...searchParamsList] : [];
      if (!searchParams || !newSearchParamsList) return;
      const minIndex = newSearchParamsList.findIndex((searchParam) =>
        searchParam.includes(encodeURI("salary_range[min]"))
      );
      const maxIndex = newSearchParamsList.findIndex((searchParam) =>
        searchParam.includes(encodeURI("salary_range[max]"))
      );

      salaryRange[0] === 0
        ? (newSearchParamsList = newSearchParamsList.filter(
            (searchParam) =>
              !searchParam.includes(encodeURI("salary_range[min]"))
          ))
        : minIndex === -1
        ? newSearchParamsList.push(
            encodeURI(`salary_range[min]=${salaryRange[0]}`)
          )
        : newSearchParamsList.splice(
            minIndex,
            1,
            encodeURI(`salary_range[min]=${salaryRange[0]}`)
          );

      salaryRange[1] === maxSalary || salaryRange[1] === 0
        ? (newSearchParamsList = newSearchParamsList.filter(
            (searchParam) =>
              !searchParam.includes(encodeURI("salary_range[max]"))
          ))
        : maxIndex === -1
        ? newSearchParamsList.push(
            encodeURI(`salary_range[max]=${salaryRange[1]}`)
          )
        : newSearchParamsList.splice(
            maxIndex,
            1,
            encodeURI(`salary_range[max]=${salaryRange[1]}`)
          );

      console.log("salaryFilter router push");
      router.push(`${pathname}?${newSearchParamsList?.sort()?.join("&")}`);
    }, 300),
    [pathname, searchParamsList]
  );

  useEffect(() => {
    // debounceSalaryRangeChange(salaryRange);
  }, [debounceSalaryRangeChange, salaryRange]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSalaryRange(newValue as number[]);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = [...salaryRange];
    e.target.name === "salary_range[min]"
      ? (newValue[0] = parseInt(e.target.value) || 0)
      : (newValue[1] = parseInt(e.target.value) || maxSalary);

    if (newValue[0] < 0) newValue[0] = 0;
    if (newValue[1] > maxSalary) newValue[1] = maxSalary;
    setSalaryRange(newValue);
  };

  const handleSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newSearchParamsList = searchParamsList ? [...searchParamsList] : [];

      let salaryTypeIndex = newSearchParamsList!.findIndex((searchParam) =>
        searchParam.includes(e.target.name)
      );

      if (salaryTypeIndex !== -1)
        e.target.value === "All"
          ? newSearchParamsList.splice(salaryTypeIndex, 1)
          : (newSearchParamsList[
              salaryTypeIndex
            ] = `${e.target.name}=${e.target.value}`);
      else newSearchParamsList.push(`${e.target.name}=${e.target.value}`);

      const href = `${pathname}?` + newSearchParamsList?.sort()?.join("&");
      router.push(href);
    },
    [pathname, router, searchParamsList]
  );

  const handleCancelSalaryFilter = useCallback(() => {
    const newSearchParamsList = searchParamsList?.filter(
      (searchParam) =>
        !searchParam.includes("salary_type") &&
        !searchParam.includes("salary_currency") &&
        !searchParam.includes(encodeURI("salary_range[min]")) &&
        !searchParam.includes(encodeURI("salary_range[max]"))
    );

    const href = `${pathname}?` + newSearchParamsList?.sort()?.join("&");
    router.push(href);
  }, [pathname, router, searchParamsList]);

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
