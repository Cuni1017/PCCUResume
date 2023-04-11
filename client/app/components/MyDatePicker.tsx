import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FieldChangeHandlerContext } from "@mui/x-date-pickers/internals";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  label?: string;
  value: Dayjs | null;
  onChange: (newValue: any, context: any) => void;
}

const MyDatePicker = ({ label, value, onChange }: Props) => {
  return (
    <DatePicker
      className="w-full"
      label={label ? label : undefined}
      value={value}
      onChange={onChange}
      minDate={dayjs()}
    />
  );
};

export default MyDatePicker;
