"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const debounce = (callback: any, time: number = 1500) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(args);
    }, time);
  };
};

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSerchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false); // 判斷是否正在輸入 for 新注音或日文等輸入法
  let searchParams = useSearchParams()?.toString();

  useEffect(() => {
    if (pathname && pathname !== "/jobs")
      setSerchTerm(decodeURI(pathname.replace("/jobs/", "")));
    else setSerchTerm("");
  }, [pathname]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSerchTerm(e.target.value);
  };

  const handlePathnameChange = useCallback(
    debounce((searchTerm: string) => {
      router.push(`/jobs/${searchTerm}?${searchParams}`, {
        forceOptimisticNavigation: true,
      });
    }, 800),
    [searchParams]
  );

  useEffect(() => {
    if (!isTyping) handlePathnameChange(searchTerm);
  }, [searchTerm, isTyping, handlePathnameChange]);

  return (
    <div className="flex gap-3 w-full">
      <TextField
        fullWidth
        variant="outlined"
        value={searchTerm}
        onChange={handleTextChange}
        onCompositionStart={() => {
          setIsTyping(true);
        }}
        onCompositionEnd={() => setIsTyping(false)}
        InputProps={{
          style: {
            height: "44px",
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="搜尋職稱、技能、公司或任何關鍵字"
        name="searchTerm"
      />
    </div>
  );
};

export default SearchBar;
