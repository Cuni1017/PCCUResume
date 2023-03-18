"use client";

import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { useSearchParams } from "next/navigation";
import FormGroup from "@mui/material/FormGroup";
import SearchFilterModel from "./shared/Model";
import SearchBar from "./shared/SearchBar";
import CheckBoxOption from "./shared/CheckBoxOption";
import Techs from "../../data/Techs.json";

const SkillFilter = ({
  searchParamsList,
  setSearchParamsList,
}: {
  searchParamsList: string[] | undefined;
  setSearchParamsList: Dispatch<SetStateAction<string[] | undefined>>;
}) => {
  const TechsSearchParams = useSearchParams()?.getAll("tech");
  const [searchTerm, setSearchTerm] = useState("");
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const renderedCheckBoxOptions = Techs.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  )
    .sort((a, b) => {
      if (TechsSearchParams?.includes(a) && !TechsSearchParams?.includes(b))
        return -1;
      if (!TechsSearchParams?.includes(a) && TechsSearchParams?.includes(b))
        return 1;
      return 0;
    })
    .map((skill) => (
      <CheckBoxOption
        key={skill}
        label={skill}
        category="tech"
        searchParamsList={searchParamsList}
        setSearchParamsList={setSearchParamsList}
      />
    ));

  return (
    <SearchFilterModel label="使用技術">
      <div className="min-w-[200px] md:w-[400px] h-[400px] overflow-auto">
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

export default SkillFilter;
