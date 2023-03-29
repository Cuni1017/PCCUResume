"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const ContentSearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSerchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false); // 判斷是否正在輸入 for 新注音或日文等輸入法
  const [isInit, setIsInit] = useState(true);
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSerchTerm(e.target.value);
  };

  const debounceSearchParamsChange = useCallback(
    debounce((searchTerm: Array<string>) => {
      searchTerm[0].length > 0
        ? router.push(`${pathname}/?q=${searchTerm}`)
        : router.push(`${pathname}`);
    }, 600),
    []
  );

  useEffect(() => {
    !isInit && !isTyping
      ? debounceSearchParamsChange(searchTerm)
      : setIsInit(false);
  }, [debounceSearchParamsChange, isTyping, searchTerm]);

  return (
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
          height: "32px",
          backgroundColor: "white",
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      placeholder="搜尋"
      name="searchTerm"
    />
  );
};

export default ContentSearchBar;

const debounce = (callback: any, time: number) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(args);
    }, time);
  };
};
