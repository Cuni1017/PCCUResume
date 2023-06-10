"use client";

import React from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import SnackBar from "@/app/components/SnackBar";
import MyButton from "../MyButton";
import {
  useGetFavoriteJobs,
  usePostFavoriteJob,
  useDeleteFavoriteJob,
} from "@/hooks/useFavoriteJobs";
import { Store } from "@/redux/store";

const SaveButton = ({ vacancyId }: { vacancyId: string }) => {
  const { username, role, name, id } = useSelector(
    (store: Store) => store.user
  );
  const { data: favoriteJobs, isFetching } = useGetFavoriteJobs({
    name: name,
    id,
    username,
    role,
  });
  const {
    mutate: PostMutate,
    isSuccess: isPostSuccess,
    isLoading: isPostLoading,
    isError: isPostError,
  } = usePostFavoriteJob(username);
  const {
    mutate: DeleteMutate,
    isSuccess: isDeleteSuccess,
    isLoading: isDeleteLoading,
    isError: isDeleteError,
  } = useDeleteFavoriteJob(username);

  let arr = favoriteJobs.map(
    (compamyDto: { vacancies: { vacanciesId: string } }) =>
      compamyDto.vacancies.vacanciesId
  );

  const handleClick = () => {
    if (!username) {
      alert("請先登入");
      return;
    }

    arr.includes(vacancyId)
      ? DeleteMutate({ name, id, username, role, vacancyId })
      : PostMutate({ name, id, username, role, vacancyId });
  };

  return (
    <>
      {(isPostSuccess || isDeleteSuccess) && (
        <SnackBar information={"成功處理要求！"} type="success" />
      )}
      {(isPostError || isDeleteError) && (
        <SnackBar information={"處理要求失敗！"} type="error" />
      )}

      <MyButton
        classnames="hover:bg-gray-300 flex items-center text-sm lg:text-base justify-center gap-1 min-h-[40px] min-w-[80px]"
        onClick={handleClick}
        disabled={isFetching || isPostLoading || isDeleteLoading}
      >
        {isFetching || isPostLoading || isDeleteLoading ? (
          <CircularProgress size="1.5rem" />
        ) : arr.includes(vacancyId) ? (
          <>
            <BookmarkIcon color="primary" />
            <div className="text-blue-400">已儲存</div>
          </>
        ) : (
          <>
            <BookmarkBorderOutlinedIcon />
            <div>儲存</div>
          </>
        )}
      </MyButton>
    </>
  );
};

export default SaveButton;
