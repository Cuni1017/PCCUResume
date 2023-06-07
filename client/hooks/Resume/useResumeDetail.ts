import { axiosInstanceNext } from "@/axiosInstance.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { defaultSelfTokenHeaders } from "../shared";

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
  const { data } = await axiosInstanceNext.post(
    `/api/students/${userId}/resumes/${resumeId}/details`,
    {
      formData,
      endpoint,
    },
    defaultSelfTokenHeaders
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
  endpointId?: string; //resume skills不需要Id
  formData: any;
  resumeId: string;
  userId: string;
}) {
  const { data } = await axiosInstanceNext.put(
    `/api/students/${userId}/resumes/${resumeId}/details`,
    {
      formData,
      endpoint,
      endpointId,
    },
    defaultSelfTokenHeaders
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
  const { data } = await axiosInstanceNext.delete(
    `/api/students/${userId}/resumes/${resumeId}/details`,
    {
      ...defaultSelfTokenHeaders,
      data: {
        endpoint,
        endpointId,
      },
    }
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
