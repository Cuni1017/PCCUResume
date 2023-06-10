"use client";

import React, { useState } from "react";
import { Store } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  useGetInformation,
  usePostInformation,
} from "@/hooks/teacher/useInformation";
import UnAuthorizedPage from "../components/UnAuthorizedPage";
import InformationCard, { Information } from "./components/InformationCard";
import Button from "@mui/material/Button";
import EditInformationCard from "./components/EditInformationCard";
import PaginationBar from "../components/SearchContainer/PaginationBar";
import SnackBar from "@/app/components/SnackBar";

const InformationPage = (props: any) => {
  const {
    searchParams: { page },
  } = props;
  const { role, username, id } = useSelector((store: Store) => store.user);
  const [isCreating, setIsCreating] = useState(false);
  const {
    data: { teacherFileDtos: informations, total, page: dataPage, limit },
  } = useGetInformation({ page });
  const totalPage = Math.ceil(total / limit);
  const currentPage = page ? (page < 0 ? 1 : parseInt(page)) : 1;

  const {
    mutate: InfoPostMutate,
    isSuccess: isInfoPostSuccess,
    isError: isInfoPostError,
  } = usePostInformation();

  const renderedInformation = () => {
    if (informations && informations.length > 0) {
      return informations.map((information: Information) => (
        <React.Fragment key={information.teacherFile.teacherFileId}>
          <hr className="w-full m-0 p-0" />
          <InformationCard information={information} />
        </React.Fragment>
      ));
    } else {
      return <div>查無任何公告</div>;
    }
  };

  const handleCreate = (formData: {
    teacherFileTitle: string;
    teacherFileTalk: string;
    teacherFileType: string;
  }) => {
    InfoPostMutate({ teacherId: id, formData });
  };

  if (!username) return <UnAuthorizedPage />;
  return (
    <>
      {isInfoPostSuccess && (
        <SnackBar information={"成功處理要求！"} type="success" />
      )}
      {isInfoPostError && (
        <SnackBar information={"處理要求失敗！"} type="error" />
      )}
      <div className="md:max-w-[860px] lg:max-w-[1140px] m-auto px-3 md:p-0">
        <div className="max-w-[600px] md:max-w-none md:w-full mx-auto mt-5">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h3 className="text-xl my-2">公告</h3>
              <div>
                <EditInformationCard
                  isOpen={isCreating}
                  onClose={() => setIsCreating(false)}
                  information={{
                    teacherDto: {
                      teacherId: "",
                      teacherUsername: "",
                      teacherName: "",
                      teacherImageUrl: "",
                      teacherEmail: "",
                      teacherNumber: "",
                      role: "",
                    },
                    teacherFile: {
                      teacherFileId: "",
                      teacherFileTitle: "",
                      teacherFileName: "",
                      teacherFileTalk: "",
                      teacherFileType: "",
                      teacherId: "",
                      teacherFilePath: "",
                      teacherFileUrl: "",
                      createTime: "",
                      updateTime: "",
                    },
                  }}
                  onUpload={handleCreate}
                />
                {role === "TEACHER" && (
                  <Button
                    variant="contained"
                    onClick={() => setIsCreating(true)}
                  >
                    新增公告
                  </Button>
                )}
              </div>
            </div>
            <div>{renderedInformation()}</div>
            {informations && informations.length > 0 && (
              <div className="mt-4 flex justify-center">
                <PaginationBar count={totalPage} page={currentPage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationPage;
