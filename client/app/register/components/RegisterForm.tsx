import { ChangeEvent, useCallback } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete, Button } from "@mui/material";
import AddressPicker from "./AddressPicker";
import TaiwanPostalCode from "./data/TaiwanPostalCode.json";
import { SelectChangeEvent } from "@mui/material/Select";

export interface FormData {
  username: string;
  password: string;
  name: string;
  email: string;
  pccuId: string;
  teacherId: string;
  companyName: string;
  companyTitle: string;
  companyNumber: string;
  companyCounty: keyof typeof TaiwanPostalCode;
  companyDistrict: string;
  companyAddress: string;
}

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  identity: string | null;
}

const RegisterForm = (props: Props) => {
  const { formData, setFormData, identity } = props;

  let formTitle = "";
  let formsInputs: {
    name: keyof typeof formData;
    label: string;
    helpText?: string;
    type?: string;
  }[] = [
    { name: "username", label: "帳號" },
    { name: "password", label: "密碼", type: "password" },
    { name: "name", label: "姓名" },
    { name: "email", label: "信箱", helpText: "將寄送驗證碼至此信箱" },
  ];
  const tempIndustryCategory = ["軟體工程師", "硬體工程師"]; //行業類別 for autoComplete

  switch (identity) {
    case "STD":
      formTitle = "學生";
      formsInputs = formsInputs.concat([{ name: "pccuId", label: "學號" }]);
      break;
    case "CPN":
      formTitle = "廠商";
      formsInputs = formsInputs.concat([
        { name: "companyName", label: "公司名稱" },
        // { name: "companyTitle", label: "行業類別" },
        { name: "companyNumber", label: "公司電話" },
      ]);
      break;
    case "TCH":
      formTitle = "教師";
      formsInputs = formsInputs.concat([
        { name: "teacherId", label: "教師ID" },
      ]);
      break;
  }

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = useCallback(
    (e: SelectChangeEvent) => {
      if (e.target.name === "companyCounty") {
        const newCity = e.target.value as keyof typeof TaiwanPostalCode;
        const newCityData = TaiwanPostalCode[newCity];
        const districts = Object.keys(newCityData);
        setFormData({
          ...formData,
          companyCounty: e.target.value as keyof typeof TaiwanPostalCode,
          companyDistrict: districts[0],
        });
      } else
        setFormData({ ...formData, [e.target.name]: e.target.value as string });
    },
    [formData, setFormData]
  );

  const renderedInputs = formsInputs.map((input) => (
    <FormTextFiled
      key={input.label}
      label={input.label}
      name={input.name}
      value={formData[input.name]}
      helperText={input.helpText ? input.helpText : undefined}
      type={input.type ? input.type : undefined}
      onChange={handleTextChange}
    />
  ));

  return (
    <div className="flex flex-col items-center h-full">
      <p className="text-center text-xl font-bold">{formTitle}</p>
      <div className="w-full sm:w-[95%]">
        <div className="flex flex-wrap gap-5 justify-center">
          {renderedInputs}
          {identity === "CPN" ? (
            <>
              <Autocomplete
                options={tempIndustryCategory}
                freeSolo
                onInputChange={(e, value) => {
                  setFormData({ ...formData, companyTitle: value });
                }}
                value={formData.companyTitle || null} // Autocomplete一定要給null不能是""
                onChange={(e, newValue) => {
                  setFormData({
                    ...formData,
                    companyTitle: newValue || "",
                  });
                }}
                sx={{ width: "100%", maxWidth: "400px" }}
                size="small"
                renderInput={(params) => {
                  // console.log(params);
                  return <TextField {...params} label="行業類別" />;
                }}
                renderOption={(props, option, state) => {
                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
              />
              <AddressPicker
                county={formData.companyCounty}
                district={formData.companyDistrict}
                address={formData.companyAddress}
                handleSelectChange={handleSelectChange}
                handleTextChange={handleTextChange}
              />
            </>
          ) : null}
        </div>
      </div>

      <div className="mt-auto mb-4 w-full">
        <Button variant="contained" fullWidth>
          提交
        </Button>
      </div>
    </div>
  );
};

interface FormTextFieldProps {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label: string;
  value: string;
  name: string;
  [key: string]: any;
}

const FormTextFiled = ({
  onChange,
  label,
  value,
  name,
  ...rest
}: FormTextFieldProps) => {
  const textfieldWidth = "100%";
  const textFiledMaxWidth = { sm: "300px", md: "400px" };

  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
      variant="outlined"
      size="small"
      sx={{ width: textfieldWidth, maxWidth: textFiledMaxWidth }}
      {...rest}
    />
  );
};

export default RegisterForm;
