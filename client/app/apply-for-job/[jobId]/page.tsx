"use client";

import { Store } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsAppLoading, cancelAppIsLoading } from "@/redux/store";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ApplyForJobForm from "./components/ApplyForJobForm";
import { axiosInstance } from "@/axiosInstance.ts";
import { getCookie } from "cookies-next";
import MyButton from "@/app/components/MyButton";
import SuccessCheck from "@/app/components/SuccessCheck";
import MyDialog from "@/app/components/MyDialog";
import UnAuthorizedPage from "@/app/components/UnAuthorizedPage";
import CloseIcon from "@mui/icons-material/Close";

export interface Resume {
  resumeId: string;
  userId: string;
  name: string;
  createTime: string;
  school: string;
}

const ApplyForJobPage = (props: any) => {
  const {
    params: { jobId },
  } = props;
  const router = useRouter();

  const appLoading = useSelector((store: Store) => store.appLoading);
  const user = useSelector((store: Store) => store.user);
  const dispatch = useDispatch();

  const time = new Date();
  const [JobInfo, setJobInfo] = useState<null | {
    vacanciesId: string;
    vacanciesName: string;
    companyId: string;
    companyName: string;
    companyImageUrl: string | null;
  }>(null);
  const [STDInfo, setSTDInfo] = useState<null | {
    studentId: string;
    studentEmail: string;
    studentNumber: string | null;
    studentImageUrl: string | null;
    studentUsername: string;
  }>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);

  const [isPostSuccess, setIsPostSuccess] = useState(false); //控制寄送成功後的Modal
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchApplyInfo = async () => {
      if (user.role !== "STUDENT") return;

      try {
        const res = await axiosInstance.get(
          `students/${user.username}/apply-for-job/vacancies/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${getCookie("JWT")}`,
            },
          }
        );

        if (res.status === 200) {
          const {
            data: {
              data: {
                applyCompanyDto,
                resumes,
                studentId,
                studentEmail,
                studentNumber,
                studentUsername,
                studentImageUrl,
              },
            },
          } = res;
          setJobInfo({ ...applyCompanyDto });
          setSTDInfo({
            studentId,
            studentEmail,
            studentNumber,
            studentUsername,
            studentImageUrl,
          });
          setResumes(resumes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user.username) fetchApplyInfo();
  }, [jobId, user]);

  if (user.role !== "STUDENT") return <UnAuthorizedPage />;

  if (!JobInfo || !STDInfo) return <div>Loading...</div>;

  const {
    vacanciesId,
    vacanciesName,
    companyId,
    companyName,
    companyImageUrl,
  } = JobInfo;

  const handleSubmit = async (formData: {
    resumeId: string;
    phone: string;
    email: string;
    letter: string;
  }) => {
    dispatch(setIsAppLoading({ isLoading: true }));

    try {
      const res = await axiosInstance.post(
        `students/${user.id}/${formData.resumeId}/apply-for-job/${companyId}/${jobId}`,
        {
          applyNumber: formData.phone,
          applyEmail: formData.email,
          applyBeforeTalk: formData.letter,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("JWT")}`,
          },
        }
      );
      if (res.status === 200) {
        // router.replace("/dashboard/applications-jobs");
        setIsPostSuccess(true);
      } else {
      }
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      // alert(error.response.data.message);
    }

    dispatch(cancelAppIsLoading());
  };

  return (
    <div>
      <MyDialog isOpen={!!errorMessage} onClose={() => setErrorMessage("")}>
        <div className="p-3 w-[70vw] sm:w-[400px]">
          <div
            className="absolute top-2 right-2 hover:bg-gray-300 cursor-pointer flex items-center justify-center"
            onClick={() => setErrorMessage("")}
          >
            <CloseIcon />
          </div>
          <div className="text-xl font-bold text-center">錯誤</div>
          <hr className="w-full" />
          <div className="indent-8 mb-6">{errorMessage}。</div>
        </div>
      </MyDialog>
      <MyDialog isOpen={isPostSuccess} onClose={() => {}}>
        <div className="py-10 px-20 flex flex-col gap-2 justify-center items-center">
          <div className="text-2xl font-bold">成功寄出履歷</div>
          <div className="text-slate-500 flex gap-1">
            在
            <Link
              href="/dashboard/applications-jobs"
              className="text-blue-500 hover:underline"
            >
              已應徵職缺
            </Link>
            中觀看應徵狀態
          </div>
          {/* <div className="text-sm text-slate-500">請不要重複寄送履歷</div> */}
          <div className="relative h-[10rem]">
            <SuccessCheck size="5rem" />
          </div>
          <Link href="/dashboard/applications-jobs">
            <MyButton classnames="text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700">
              已應徵職缺
            </MyButton>
          </Link>
        </div>
      </MyDialog>
      <div className="min-h-[2rem] bg-white px-5 md:p-0">
        <div className="max-w-[600px] m-auto">
          <div className="flex flex-col gap-3 py-5">
            <div className="flex items-center gap-2">
              <Link
                href={`/companies/${vacanciesName}`}
                target="_blank"
                style={{ position: "relative" }}
              >
                <div className="relative w-[2.5rem] h-[2.5rem] border-solid border border-[#e2e6e4] cursor-pointer">
                  <Image
                    src={companyImageUrl ? companyImageUrl : "/PCCUResume.png"}
                    alt="companyLogo"
                    fill
                    sizes="100%"
                  />
                </div>
              </Link>
              <Link href={`/companies/${companyName}`} target="_blank">
                <div className="text-lg font-bold hover:underline cursor-pointer">
                  {companyName}
                </div>
              </Link>
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-bold ">
                <Link
                  href={`/companies/${companyName}/jobs/${vacanciesId}`}
                  target="_blank"
                  className="hover:underline"
                >
                  {JobInfo.vacanciesName}
                </Link>
              </div>
              <div className="text-sm text-slate-500">
                {time.toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[600px] m-auto py-5 px-5 md:px-0">
        <div className="flex flex-col gap-5">
          <div className="text-lg text-slate-500">送出您的履歷</div>
          <div className="flex items-center gap-2">
            <div className="rounded-full overflow-hidden relative w-[4.5rem] h-[4.5rem]">
              <Image
                src={user.imageURL ? user.imageURL : "/PCCUResume.png"}
                fill
                sizes="100%"
                alt="cat"
              ></Image>
            </div>
            <div className="text-lg">cory1</div>
          </div>
          <ApplyForJobForm
            resumes={resumes}
            STDInfo={STDInfo}
            onSubmit={handleSubmit}
            appIsLoading={appLoading.isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplyForJobPage;
