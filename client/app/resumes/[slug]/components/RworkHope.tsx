"use client";

import React, { useEffect, useState } from "react";
import Card from "../../../components/Card";
import { MuiChipsInput } from "mui-chips-input";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ResumeItemHeader from "./shared/ResumeItemHeader";
import ResumeItemContent from "./shared/ResumeItemContent";
import HeaderController from "./shared/HeaderController";
import SaveCheck from "./shared/SaveCheck";
import {
  usePostResumeDetail,
  usePutResumeDetail,
} from "@/hooks/Resume/useResumeDetail";

// 工作期望

interface WorkHope {
  type: string;
  date: string;
  id: string;
  resumeId: string;
  userId: string;
}

interface Props {
  userId: string;
  resumeId: string;
  workHope: WorkHope;
  isEditMode: boolean;
}

const RWorkHope = ({ userId, resumeId, workHope, isEditMode }: Props) => {
  const [data, setData] = useState(workHope);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (workHope) setData(workHope);
  }, [workHope]);

  return (
    <Card>
      <ResumeItemHeader label="求職條件">
        <HeaderController
          Icon={EditIcon}
          text="編輯"
          isEditing={isEditing}
          setIsEditing={() => setIsEditing(!isEditing)}
          isEditMode={isEditMode}
        />
      </ResumeItemHeader>
      <ResumeItemContent>
        <>
          {isEditing && isEditMode ? (
            <WorkHopeEditCard
              workHope={data}
              setIsEditing={setIsEditing}
              userId={userId}
            />
          ) : (
            <WorkHopeCard workHope={data} />
          )}
        </>
      </ResumeItemContent>
    </Card>
  );
};

const WorkHopeEditCard = ({
  userId,
  workHope,
  setIsEditing,
}: {
  userId: string;
  workHope: WorkHope;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [data, setData] = useState(workHope);
  const [types, setTypes] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  const { mutate: PostMutate } = usePostResumeDetail(data.resumeId);
  const { mutate: PutMutate } = usePutResumeDetail(data.resumeId);

  const handleSave = () => {
    if (data.id !== "") {
      PutMutate({
        userId,
        resumeId: data.resumeId,
        endpoint: "work-hope",
        endpointId: data.id,
        formData: {
          date: data.date,
          type: data.type,
        },
      });
    } else {
      PostMutate({
        userId,
        resumeId: data.resumeId,
        endpoint: "work-hope",
        formData: {
          date: data.date,
          type: data.type,
        },
      });
    }

    setIsEditing(false);
  };

  const typesMergeToData = () => {
    const sorted = types.sort();
    setData({
      ...data,
      type: sorted.join("、"),
    });
  };

  const datesMergeToData = () => {
    const sorted = dates.sort((a, b) => {
      return a.localeCompare(b, "zh-hant");
    });
    return setData({
      ...data,
      date: sorted.join("、"),
    });
  };

  useEffect(() => {
    datesMergeToData();
  }, [dates]);

  useEffect(() => {
    typesMergeToData();
  }, [types]);

  useEffect(() => {
    if (workHope.type) {
      const initialTypes = workHope.type.split("、");
      setTypes(initialTypes);
    }
    if (workHope.date) {
      const initialDate = workHope.date.split("、");
      setDates(initialDate);
    }
  }, [workHope]);

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

  const week = ["週一", "週二", "週三", "週四", "週五", "週六", "週七"];
  const renderedCheckboxs = week.map((day, index) => (
    <FormControlLabel
      key={day}
      control={
        <Checkbox
          name={day}
          checked={dates.includes(day) ? true : false}
          onChange={(e) => handleDateChange(e)}
        />
      }
      label={day}
    />
  ));

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="w-full max-w-[100px]">
          <span>上班時段：</span>
        </div>
        <div>{renderedCheckboxs}</div>
      </div>
      <div>
        <div className="w-full max-w-[100px]">
          <span>期望職類：</span>
        </div>
        <MuiChipsInput
          value={types}
          onChange={handleTypeChange}
          size="small"
          fullWidth
          placeholder="請輸入並按下Enter"
          className="mt-2"
        />
      </div>
      <div>
        <SaveCheck
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          disabled={!data.date || !data.type}
        />
      </div>
    </div>
  );
};

const WorkHopeCard = ({ workHope }: { workHope: WorkHope }) => {
  const renderedContent = () => {
    if (!workHope.date && !workHope.type) {
      return (
        <div className="w-full text-center">填寫課表之餘的天數與期望職類！</div>
      );
    } else {
      return (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 md:flex-row">
            <div>上班時段：</div>
            <div>{workHope.date}</div>
          </div>
          <div className="flex flex-col gap-1 md:flex-row">
            <div>期望職類：</div>
            <div>{workHope.type}</div>
          </div>
        </div>
      );
    }
  };

  return <>{renderedContent()}</>;
};

export default RWorkHope;
