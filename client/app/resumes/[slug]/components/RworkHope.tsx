import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Card from "../../../components/Card";
import { MuiChipsInput } from "mui-chips-input";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ResumeItemHeader from "./shared/ResumeItemHeader";
import ResumeItemContent from "./shared/ResumeItemContent";
import SaveCheck from "./shared/SaveCheck";

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
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    console.log(data, "save");
  };

  const handleTypeChange = (newChips: any) => {
    setTypes(newChips);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          disabled={!isEditing}
          checked={dates.includes(day) ? true : false}
          onChange={(e) => handleDateChange(e)}
        />
      }
      label={day}
    />
  ));

  return (
    <Card>
      <ResumeItemHeader label="求職條件">
        <span
          onClick={() => setIsEditing(!isEditing)}
          className="text-end text-sm flex items-center justify-end text-gray-500 hover:text-gray-800 cursor-pointer absolute top-1 right-5 gap-1"
        >
          {isEditing ? (
            <>
              <CloseIcon /> 關閉
            </>
          ) : (
            <>
              <EditIcon /> 編輯
            </>
          )}
        </span>
      </ResumeItemHeader>
      <ResumeItemContent>
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full flex flex-col md:flex-row justify-center md:items-center gap-1">
              <div className="w-full max-w-[100px]">
                <span>上班時段：</span>
              </div>
              <div className="w-full">
                <FormGroup className="flex flex-row justify-center md:justify-between w-full">
                  {renderedCheckboxs}
                </FormGroup>
              </div>
            </div>
            <div className="">
              <div className="w-full max-w-[100px]">
                <span>期望職類：</span>
              </div>
              <MuiChipsInput
                value={types}
                onChange={handleTypeChange}
                disabled={!isEditing}
                size="small"
                fullWidth
                placeholder={isEditing ? "請輸入並按下Enter" : ""}
              />
            </div>
          </div>
          {isEditing ? (
            <div>
              <SaveCheck
                onSave={handleSave}
                onCancel={() => setIsEditing(false)}
                disabled={false}
              />
            </div>
          ) : null}
        </div>
      </ResumeItemContent>
    </Card>
  );
};

export default RWorkHope;
