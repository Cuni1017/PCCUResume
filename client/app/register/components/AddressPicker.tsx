import { ChangeEvent, useMemo } from "react";
import { FormControl, MenuItem, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TaiwanPostalCode from "./data/TaiwanPostalCode.json";

interface Props {
  county: keyof typeof TaiwanPostalCode;
  district: string;
  address: string;
  handleSelectChange: (e: SelectChangeEvent) => void;
  handleTextChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const AddressPicker = (props: Props) => {
  const { county, district, address, handleSelectChange, handleTextChange } =
    props;
  const cities = useMemo(() => Object.keys(TaiwanPostalCode), []);
  const cityData = TaiwanPostalCode[county];
  const districts = Object.keys(cityData);

  return (
    <>
      <FormControl size="small" sx={{ width: "100%", maxWidth: "400px" }}>
        <InputLabel id="city-lable">縣市</InputLabel>
        <Select
          labelId="city-label"
          value={county}
          name="companyCounty"
          label="city"
          onChange={handleSelectChange}
        >
          {getCityOptions(cities)}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ width: "100%", maxWidth: "400px" }}>
        <InputLabel id="district-lable">鄉/鎮/市/區</InputLabel>
        <Select
          labelId="district-label"
          value={district}
          name="companyDistrict"
          label="district"
          onChange={handleSelectChange}
        >
          {getDistrictOptions(districts)}
        </Select>
      </FormControl>
      <TextField
        label="地址"
        name="companyAddress"
        value={address}
        onChange={handleTextChange}
        variant="outlined"
        size="small"
        fullWidth
      />
    </>
  );
};

const getCityOptions = (cities: string[]) => {
  return cities.map((city) => {
    return (
      <MenuItem key={city} value={city}>
        {city}
      </MenuItem>
    );
  });
};

const getDistrictOptions = (districts: string[]) => {
  return districts.map((district) => {
    return (
      <MenuItem key={district} value={district}>
        {district}
      </MenuItem>
    );
  });
};

export default AddressPicker;
