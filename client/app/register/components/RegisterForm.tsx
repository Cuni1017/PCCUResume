import { ChangeEvent, useCallback } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete, Button } from "@mui/material";
import AddressPicker from "../../components/AddressPicker";
import TaiwanPostalCode from "../../components/data/TaiwanPostalCode.json";
import { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2"; //v2
import { CircularProgress } from "@mui/material";

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
  handleSubmit: () => void;
  isFetching: boolean;
  handleBack: () => void;
}

const RegisterForm = (props: Props) => {
  const {
    formData,
    setFormData,
    identity,
    handleSubmit,
    isFetching,
    handleBack,
  } = props;

  let formTitle = "";
  let formInputs: {
    name: keyof typeof formData;
    label?: string; //如果沒label，renderedInputs就不印
    helpText?: string;
    type?: string;
    col?: number;
    disable?: boolean;
  }[] = [
    { name: "email", label: "信箱", col: 12, disable: true },
    { name: "username", label: "帳號" },
    { name: "password", label: "密碼", type: "password" },
  ];
  const tempIndustryCategory = [
    "廣告／行銷／代理",
    "農林漁牧業",
    "建築設計",
    "銀行／保險／金融",
    "教育／培訓／招聘",
    "法律／法規",
    "顧問／審計",
    "移動／運輸",
    "非營利／社團組織",
    "科技",
    "工業",
    "服務",
  ]; //行業類別 for AutoComplete

  switch (identity) {
    case "STD":
      formTitle = "學生";
      formInputs = formInputs.concat([
        { name: "name", label: "姓名" },
        { name: "pccuId", label: "學號" },
      ]);
      break;
    case "CPN":
      formTitle = "公司";
      formInputs = formInputs.concat([
        { name: "companyName", label: "公司名稱", col: 12 },
        { name: "companyNumber", label: "公司電話" },
        { name: "companyTitle" },
        { name: "companyCounty" },
        { name: "companyDistrict" },
        { name: "companyAddress" },
      ]);
      break;
    case "TCH":
      formTitle = "教師";
      formInputs = formInputs.concat([
        { name: "name", label: "姓名" },
        { name: "teacherId", label: "教師ID" },
      ]);
      break;
  }

  // 控制button disabled
  const checkIsFormCorrect = !formInputs.every(
    (input) => formData[input.name] !== ""
  );

  // for TextFiled
  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // for Select
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

  const renderedInputs = formInputs.map((input) => {
    if (!input.label) return;
    return (
      <Grid xs={12} sm={input.col ? input.col : 6} key={input.label}>
        <FormTextFiled
          label={input.label as string}
          name={input.name}
          value={formData[input.name]}
          helperText={input.helpText ? input.helpText : undefined}
          type={input.type ? input.type : undefined}
          onChange={handleTextChange}
          disabled={input.disable ? true : undefined}
        />
      </Grid>
    );
  });

  return (
    <div className="mt-10 flex flex-col h-full">
      <div className="flex items-center">
        <h1 className="m-5">請輸入資訊</h1>
        <Button variant="contained" onClick={handleBack} className="ml-auto">
          重新選擇身分
        </Button>
      </div>
      <p className="text-center text-xl font-bold">{formTitle}</p>
      <div className="w-full">
        {/* <div className="flex flex-wrap gap-5 justify-center"> */}
        <Grid container spacing={2} className="justify-center">
          {renderedInputs}
          {identity === "CPN" ? (
            <>
              <Grid xs={12} sm={6}>
                <Autocomplete
                  options={tempIndustryCategory}
                  freeSolo // !給用戶自己輸入，等有行業分類後拔掉
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
              </Grid>
              <AddressPicker
                county={formData.companyCounty}
                district={formData.companyDistrict}
                address={formData.companyAddress}
                handleSelectChange={handleSelectChange}
                handleTextChange={handleTextChange}
              />
            </>
          ) : null}
        </Grid>
      </div>
      {/* </div> */}

      <div className="mt-4 sm:mt-auto mb-10 w-full">
        <Button
          variant="contained"
          fullWidth
          disabled={checkIsFormCorrect || isFetching}
          onClick={handleSubmit}
        >
          {isFetching ? <CircularProgress /> : "提交"}
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
  const textFiledMaxWidth = { sm: "300px", md: "380px" };
  const sx = { width: textfieldWidth }; //, maxWidth: textFiledMaxWidth

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
      sx={sx}
      {...rest}
    />
  );
};

export default RegisterForm;
