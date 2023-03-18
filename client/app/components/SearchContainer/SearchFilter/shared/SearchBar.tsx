import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ value, onChange }: Props) => {
  return (
    <div className="flex gap-3">
      <TextField
        fullWidth
        variant="outlined"
        value={value}
        onChange={onChange}
        // onCompositionStart={() => {
        //   setIsTyping(true);
        // }}
        InputProps={{
          style: {
            height: "36px",
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder=""
        // onCompositionEnd={() => setIsTyping(false)}
        name="searchTerm"
      />
    </div>
  );
};

export default SearchBar;
