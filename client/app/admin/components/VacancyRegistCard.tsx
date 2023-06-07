"use client";

import React, { useState } from "react";
import JobInfoCard, { Vacancy } from "@/app/components/JobInfoCard";
import MyButton from "@/app/components/MyButton";
import { DoubleCheckDialog } from "@/app/companies/[slug]/applicants/components/ApplyActionDialog";
import { useSelector } from "react-redux";
import { usePutVacancy } from "@/hooks/teacher/useAdmin";
import { Store } from "@/redux/store";

const VacancyRegistCard = ({
  vacancy,
  isReviewed,
}: {
  vacancy: Vacancy;
  isReviewed?: boolean;
}) => {
  const [isShowActions, setIsShowActions] = useState(false);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);

  const { mutate, isSuccess, isLoading } = usePutVacancy(vacancy.companyName);
  const { id } = useSelector((store: Store) => store.user);

  const handleAgree = () => {
    mutate({
      teacherId: id,
      vacancyId: vacancy.vacanciesId as string,
      teacherValidType: "審核通過",
    });
  };

  const handleReject = () => {
    mutate({
      teacherId: id,
      vacancyId: vacancy.vacanciesId as string,
      teacherValidType: "審核不通過",
    });
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsShowActions(true)}
      onMouseLeave={() => setIsShowActions(false)}
    >
      <DoubleCheckDialog
        title={"確認刪除？"}
        content={"將拒絕此職缺申請。"}
        isOpen={isDeleteModalShow}
        isLoading={isLoading}
        onSure={handleReject}
        onClose={() => setIsDeleteModalShow(false)}
        type="danger"
      />
      <JobInfoCard
        classnames={`${isShowActions ? "bg-gray-200" : "bg-white"}`}
        vacancy={vacancy}
        disableActions
        disableBackground
      />
      <div
        className={`bottom-5 right-5 flex flex-col md:flex-row gap-2 ${
          isShowActions ? "absolute" : "hidden"
        }`}
      >
        {isReviewed ? null : (
          <MyButton
            onClick={handleAgree}
            classnames="text-white bg-green-500 hover:bg-green-600 focus:bg-green-700 w-[10rem] h-[40px]"
          >
            同意
          </MyButton>
        )}
        <MyButton
          onClick={() => {
            setIsDeleteModalShow(true);
            setIsShowActions(false);
          }}
          classnames="text-white bg-red-500 hover:bg-red-600 focus:bg-red-700 w-[10rem] h-[40px]"
        >
          拒絕
        </MyButton>
      </div>
    </div>
  );
};

export default VacancyRegistCard;
