import { axiosInstance, axiosInstanceNext } from "@/axiosInstance.ts";
import { getCookie } from "cookies-next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/tanstack-query/constant";

const JWT = getCookie("JWT");

const endpoint = [
  "work-hope",
  "special-skill",
  "license",
  "project-achievments",
  "autobiography",
  "work-experience",
];

const options = {
  headers: {
    Authorization: `Bearer ${JWT}`,
  },
};

async function postResumeDetail({
  userId,
  resumeId,
  endpoint,
  formData,
}: {
  userId: string;
  resumeId: string;
  endpoint: string;
  formData: any;
}) {
  const { data } = await axiosInstance.post(
    `/students/${userId}/resumes/${resumeId}/${endpoint}`,
    formData,
    options
  );
  return data.data;
}

async function putResumeDetail({
  endpoint,
  endpointId,
  formData,
  resumeId,
  userId,
}: {
  endpoint: string;
  endpointId: string;
  formData: any;
  resumeId: string;
  userId: string;
}) {
  const { data } = await axiosInstance.put(
    `/students/${userId}/resumes/${resumeId}/${endpoint}/${endpointId}`,
    formData,
    options
  );
  return data.data;
}

async function deleteResumeDetail({
  endpoint,
  endpointId,
  resumeId,
  userId,
}: {
  endpoint: string;
  endpointId: string;
  resumeId: string;
  userId: string;
}) {
  const { data } = await axiosInstance.delete(
    `/students/${userId}/resumes/${resumeId}/${endpoint}/${endpointId}`,
    options
  );

  return data.message;
}

export function usePostResumeDetail(resumeId: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postResumeDetail,
    onSuccess: () => {
      queryClient.invalidateQueries(["resume", resumeId]);
    },
  });

  return mutation;
}
export function usePutResumeDetail(resumeId: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: putResumeDetail,
    onSuccess: () => {
      queryClient.invalidateQueries(["resume", resumeId]);
    },
  });

  return mutation;
}
export function useDeleteResumeDetail(resumeId: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteResumeDetail,
    onSuccess: () => {
      queryClient.invalidateQueries(["resume", resumeId]);
    },
  });
  return mutation;
}
