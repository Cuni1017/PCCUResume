import React, { useMemo } from "react";
import { Vacancy } from "@/app/components/SearchContainer/JobInfoCard";

const JobStateCounter = ({ vacancies }: { vacancies: Vacancy[] }) => {
  const [openCount, hiddenCount, pauseCount] = useMemo(() => {
    let o = 0,
      h = 0,
      p = 0;
    vacancies.forEach((vacancy) => {
      const { vacanciesWatchType } = vacancy;
      if (vacanciesWatchType === "公開") o++;
      else if (vacanciesWatchType === "隱藏") h++;
      else if (vacanciesWatchType === "暫停") p++;
    });
    return [o, h, p];
  }, [vacancies]);

  return (
    <div className="flex gap-2 text-sm">
      <div className="flex gap-2">
        職缺總計
        <span>{vacancies.length}</span>
      </div>
      <div className="text-[#d1d6d4]">|</div>
      <div className="flex gap-2">
        公開
        <span>{openCount}</span>
      </div>
      <div className="flex gap-2">
        隱藏
        <span>{hiddenCount}</span>
      </div>
      <div className="flex gap-2">
        暫停
        <span>{pauseCount}</span>
      </div>
    </div>
  );
};

export default JobStateCounter;
