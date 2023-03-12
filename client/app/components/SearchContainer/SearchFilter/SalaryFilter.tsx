"use client";

import { ChangeEvent, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchFilterModel from "./shared/Model";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
  return `${value} TWD`;
}

const SalaryFilter = () => {
  const [salaryType, setSalaryType] = useState("");
  const [value, setValue] = useState<number[]>([0, 10000000]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    console.log(newValue);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = [...value];
    e.target.name === "min"
      ? (newValue[0] = parseInt(e.target.value) | 0)
      : (newValue[1] = parseInt(e.target.value) | 0);
    setValue(newValue);
    console.log(e.target.value);
  };

  const handleTypeChange = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <SearchFilterModel label="薪資">
      <div className="w-[400px] h-[400px] p-3 overflow-hidden">
        <div>
          <select
            className="w-full h-[40px]"
            name="salary_type"
            value={salaryType}
            onChange={handleTypeChange}
          >
            <option value="per_hour">時</option>
            <option value="per_day">日</option>
          </select>
        </div>
        <div className="px-2">
          <Slider
            getAriaLabel={() => "Salary range"}
            value={value}
            min={0}
            max={10000000}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </div>
        <div className="flex items-center justify-between">
          <OutlinedInput
            value={value[0]}
            size="small"
            name="min"
            sx={{ width: "100%", maxWidth: "180px" }}
            placeholder="0"
            onChange={handleTextChange}
          />
          <RemoveIcon />
          <OutlinedInput
            value={value[1]}
            size="small"
            name="max"
            sx={{ width: "100%", maxWidth: "180px" }}
            placeholder="10000000"
            onChange={handleTextChange}
          />
        </div>
      </div>
    </SearchFilterModel>
  );
};

export default SalaryFilter;
