"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const SearchBar = ({ placeholder }: { placeholder?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSerchTerm] = useState(
    searchParams?.get("q") ? searchParams?.get("q") : ""
  );
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
    [pathname]
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
          height: "36px",
          backgroundColor: "white",
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            position="end"
            style={{ display: searchTerm ? "inline-flex" : "none" }}
          >
            <IconButton size="small" onClick={() => setSerchTerm("")}>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      placeholder={placeholder ? placeholder : "搜尋"}
      name="searchTerm"
    />
  );
};

export default SearchBar;

const debounce = (callback: any, time: number) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(args);
    }, time);
  };
};
