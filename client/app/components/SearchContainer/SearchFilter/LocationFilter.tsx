"use client";

import { ChangeEvent, useState } from "react";
import SearchFilterModel from "./shared/Model";
import SearchBar from "./shared/SearchBar";
import CheckBoxOption from "./shared/CheckBoxOption";
import FormGroup from "@mui/material/FormGroup";
import TaiwanPostalCode from "@/app/components/data/TaiwanPostalCode.json";
import { useSearchParams } from "next/navigation";

const LocationFilter = () => {
  const cities = Object.keys(TaiwanPostalCode);
  const LocationSearchParams = useSearchParams()?.getAll("location_list");

  const [searchTerm, setSearchTerm] = useState("");
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const renderedCheckBoxOptions = cities
    .filter((city) => city.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (
        LocationSearchParams?.includes(a) &&
        !LocationSearchParams?.includes(b)
      )
        return -1;
      if (
        !LocationSearchParams?.includes(a) &&
        LocationSearchParams?.includes(b)
      )
        return 1;
      return 0;
    })
    .map((city) => (
      <CheckBoxOption key={city} label={city} category="location_list" />
    ));

  return (
    <SearchFilterModel label="地點">
      <div className="w-[400px] h-[400px] overflow-auto">
        <div className="p-3 pb-0">
          <SearchBar value={searchTerm} onChange={handleTextChange} />
        </div>
        <hr />
        <div className="px-3">
          <FormGroup>{renderedCheckBoxOptions}</FormGroup>
        </div>
      </div>
    </SearchFilterModel>
  );
};

export default LocationFilter;
