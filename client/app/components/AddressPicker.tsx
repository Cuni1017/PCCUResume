import { ChangeEvent, useMemo } from "react";
import { FormControl, MenuItem, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TaiwanPostalCode from "@/data/TaiwanPostalCode.json";
import Grid from "@mui/material/Unstable_Grid2"; //v2

interface Props {
  errors?: { address?: boolean; district?: boolean; county?: boolean };
  county: keyof typeof TaiwanPostalCode;
  district: string;
  address: string;
  handleSelectChange: (e: SelectChangeEvent) => void;
  handleTextChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const AddressPicker = (props: Props) => {
  const {
    county,
    district,
    address,
    handleSelectChange,
    handleTextChange,
    errors,
  } = props;
  const cities = useMemo(() => Object.keys(TaiwanPostalCode), []);
  const cityData = TaiwanPostalCode[county];
  const districts = Object.keys(cityData);

  const textfieldWidth = "100%";
  const textFiledMaxWidth = { sm: "300px", md: "380px" };
  const sx = { width: textfieldWidth, maxWidth: textFiledMaxWidth };

  const selectGridSpacing = { xs: 12, sm: 6 };

  return (
    <>
      <Grid {...selectGridSpacing}>
        <FormControl size="small" fullWidth>
          <InputLabel id="city-lable">縣市</InputLabel>
          <Select
            labelId="city-label"
            error={errors ? errors.county : undefined}
            value={county}
            name="companyCounty"
            label="city"
            onChange={handleSelectChange}
          >
            {getCityOptions(cities)}
          </Select>
        </FormControl>
      </Grid>
      <Grid {...selectGridSpacing}>
        <FormControl size="small" fullWidth>
          <InputLabel id="district-lable">鄉/鎮/市/區</InputLabel>
          <Select
            labelId="district-label"
            error={errors ? errors.district : undefined}
            value={district}
            name="companyDistrict"
            label="district"
            onChange={handleSelectChange}
          >
            {getDistrictOptions(districts)}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <TextField
          label="地址"
          name="companyAddress"
          error={errors ? errors.address : undefined}
          value={address}
          onChange={handleTextChange}
          variant="outlined"
          size="small"
          fullWidth
        />
      </Grid>
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
