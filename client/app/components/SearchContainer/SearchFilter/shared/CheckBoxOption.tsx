import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Image from "next/image";

const CheckBoxOption = ({
  label,
  category,
}: {
  label: string;
  category: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const allSearchParams = searchParams?.toString();
  let searchParamsList = allSearchParams?.split("&").filter((x) => x);

  const handleClick = () => {
    searchParamsList?.includes(`${category}=${encodeURI(label)}`)
      ? (searchParamsList = searchParamsList.filter(
          (searchParams) => searchParams !== `${category}=${encodeURI(label)}`
        ))
      : searchParamsList?.push(`${category}=${label}`);

    const href = `${pathname}?` + searchParamsList?.join("&");
    router.push(href);
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
