import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Card from "../../../components/Card";
import { MuiChipsInput } from "mui-chips-input";

import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// 工作期望

interface Props {
  userId: string;
  resumeId: string;
  workHope: {
    type: string;
    date: string;
    id: string;
    resumeId: string;
    userId: string;
  };
}

const RWorkHope = ({ userId, resumeId, workHope }: Props) => {
  const [data, setData] = useState({
    type: "", //希望職類
    date: "", //上班時段
  });
  const [types, setTypes] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  const handleTypeChange = (newChips: any) => {
    setTypes(newChips);
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let newDate = dates;
    if (!newDate.includes(e.target.name)) {
      setDates([...dates, e.target.name]);
    } else {
      newDate = newDate.filter((day) => day !== e.target.name);
      setDates(newDate);
    }
  };

  const typesMergeToData = useCallback(() => {
    setData({
      ...data,
      type: types.join("、"),
    });
  }, [types]);

  const datesMergeToData = useCallback(() => {
    return setData({
      ...data,
      date: dates.join("、"),
    });
  }, [dates]);

  useEffect(() => {
    datesMergeToData();
  }, [dates, datesMergeToData]);

  useEffect(() => {
    typesMergeToData();
  }, [types, typesMergeToData]);

  useEffect(() => {
    if (workHope) {
      const initialTypes = workHope.type.split("、");
      const initialDate = workHope.date.split("、");
      setTypes(initialTypes);
      setDates(initialDate);

      setData({
        type: workHope.type,
        date: workHope.date,
      });
    }
  }, [workHope]);

  const week = ["週一", "週二", "週三", "週四", "週五", "週六", "週七"];
  const renderedCheckboxs = week.map((day, index) => (
    <FormControlLabel
      key={day}
      control={
        <Checkbox
          name={day}
          checked={dates.includes(day) ? true : false}
          onChange={(e) => handleDateChange(e, index)}
        />
      }
      label={day}
    />
  ));

  return (
    <Card>
      <div className="py-3">
        <div className="text-xl border-solid border-0 border-b border-gray-300 w-full text-center leading-10 font-bold">
          求職條件
        </div>
        <div className="flex flex-col items-center justify-center gap-3 p-4">
          <div className="w-full md:max-w-[700px] flex flex-col md:flex-row justify-center items-start md:items-center">
            <div className="w-full max-w-[100px]">
              <span>上班時段：</span>
            </div>
            <div className="w-full">
              <FormGroup className="flex flex-row justify-center md:justify-between w-full">
                {renderedCheckboxs}
              </FormGroup>
            </div>
          </div>
          <div className="w-full md:max-w-[700px] flex flex-col md:flex-row justify-center items-start md:items-center">
            <div className="w-full max-w-[100px]">
              <span>期望職類：</span>
            </div>
            <MuiChipsInput
              value={types}
              onChange={handleTypeChange}
              size="small"
              fullWidth
              placeholder="請輸入並按下Enter"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RWorkHope;
