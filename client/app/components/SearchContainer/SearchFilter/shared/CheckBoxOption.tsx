import React, { Dispatch, SetStateAction } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Image from "next/image";

const CheckBoxOption = ({
  label,
  category,
  searchParamsList,
  setSearchParamsList,
}: {
  label: string;
  category: string;
  searchParamsList: string[] | undefined;
  setSearchParamsList: Dispatch<SetStateAction<string[] | undefined>>;
}) => {
  const handleClick = () => {
    if (!searchParamsList) {
      setSearchParamsList([`${category}=${encodeURI(label)}`]);
      return;
    }

    let newSearchParamsList = [...searchParamsList];
    newSearchParamsList?.includes(`${category}=${encodeURI(label)}`)
      ? (newSearchParamsList = newSearchParamsList.filter(
          (searchParam) => searchParam !== `${category}=${encodeURI(label)}`
        ))
      : newSearchParamsList?.push(`${category}=${encodeURI(label)}`);
    setSearchParamsList(newSearchParamsList);
  };

  const imgSrc = `/techs/${
    label === "C#" ? "C Sharp" : label === ".net" ? "dot Net" : label
  }.svg`;

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={searchParamsList?.includes(
              `${category}=${encodeURI(label)}`
            )}
            onClick={handleClick}
          />
        }
        label={
          <div className="flex items-center gap-2 text-lg text-slate-600 h-[25px]">
            {category === "tech" ? (
              <Image src={imgSrc} width={25} height={25} alt={label}></Image>
            ) : null}
            {label}
          </div>
        }
      />
    </>
  );
};

export default CheckBoxOption;
