"use client";

import { useState } from "react";
import CompanyHeader from "../components/CompanyHeader/CompanyHeader";
import ApplyTrackCard from "./components/ApplyTrackCard";
import {
  useGetApplies,
  usePutApply,
  usePutApplyTime,
} from "@/hooks/useApplicants";
import { Vacancy } from "@/app/components/JobInfoCard";
import ContentAction from "../components/CompanyContent/ContentAction";
import ApplyActionDialog, { ApplyType } from "./components/ApplyActionDialog";
import Link from "next/link";
import MyButton from "@/app/components/MyButton";
import SnackBar from "@/app/components/SnackBar";
import { useSelector } from "react-redux";
import { Store } from "@/redux/store";
import UnAuthorizedPage from "@/app/components/UnAuthorizedPage";

export interface ApplyUser {
  applyId: string;
  applyType: string;
  companyId: string;
  createTime: string;
  resumeId: string;
  studentEmail: string;
  studentImageUrl: string | null;
  studentRealName: string;
  applyEmail: string;
  applyNumber: number;
  studentUsername: string;
  applyBeforeTalk: string;
  applyStartTime: string;
  applyEndTime: string;
  applyUpdateTime: string;
  userId: string;
  vacanciesId: string;
}

export interface Company {
  companyId: string;
  companyName: string;
  companyTitle: string;
  companyNumber: number;
  companyCounty: string;
  companyDistrict: string;
  companyAddress: string;
  companyEmail: string;
  companyImageUrl: string | null;
}

export type FullVacanciesDto = Company & {
  vacancies: Vacancy;
  skills: string;
  county: string;
};

export interface Apply {
  applyUserDto: ApplyUser[];
  fullVacanciesDto: FullVacanciesDto;
}

const ApplicantsPage = (props: any) => {
  const {
    params: { slug: companyName },
  } = props;

  const { name, role } = useSelector((store: Store) => store.user);

  const [editApplyUser, setEditApplyUser] = useState<ApplyUser | null>(null);

  const { data: applies } = useGetApplies(companyName);
  const { mutate: PutMutate, isSuccess: isPutSuccess } =
    usePutApply(companyName);
  const { mutate: PutTimeMutate, isSuccess: isPutTimeMutate } =
    usePutApplyTime(companyName);

  const handlePutApply = ({
    applyId,
    applyType,
  }: {
    applyId: string;
    applyType: ApplyType;
  }) => {
    PutMutate({ applyId, applyType });
    setEditApplyUser(null);
  };

  const handlePutApplyTime = ({
    applyId,
    applyStartTime,
    applyEndTime,
  }: {
    applyId: string;
    applyStartTime: string;
    applyEndTime: string;
  }) => {
    PutTimeMutate({ applyId, applyStartTime, applyEndTime });
    setEditApplyUser(null);
  };

  if (!name || name !== decodeURI(companyName) || role !== "COMPANY")
    return <UnAuthorizedPage />;

  return (
    <div className="flex flex-col gap-4">
      {(isPutSuccess || isPutTimeMutate) && (
        <SnackBar information={"成功處理要求！"} type="success" />
      )}
      <CompanyHeader companyName={companyName} />
      <div className="px-3 md:p-0 box-border w-full md:max-w-[860px] lg:max-w-[1140px] m-auto">
        <div className="flex justify-between items-center text-lg">
          <div>職缺應徵列表</div>
          <div className="text-sm flex gap-1 sm:gap-2">
            <ContentAction companyName={companyName} />
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          {applies.length > 0 ? (
            applies.map((apply: Apply) => (
              <ApplyTrackCard
                key={apply.fullVacanciesDto.vacancies.vacanciesId}
                apply={apply}
                setEditApplyUser={setEditApplyUser}
              />
            ))
          ) : (
            <div className="flex flex-col gap-5">
              <div className="text-slate-500 text-center">
                目前沒有任何職缺有應徵者
              </div>
              <div className="flex flex-col gap-2 items-center">
                透過人才搜尋功能來主動尋找合適者！
                <div>
                  <Link href={"/search"}>
                    <MyButton classnames="text-lg hover:bg-gray-300 w-[8rem] h-[3rem]">
                      徵才
                    </MyButton>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ApplyActionDialog
        onSubmit={handlePutApply}
        onEditApplyTime={handlePutApplyTime}
        onClose={() => setEditApplyUser(null)}
        applyUser={editApplyUser}
      />
    </div>
  );
};

export default ApplicantsPage;
