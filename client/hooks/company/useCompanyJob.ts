import { axiosInstanceNext } from "@/axiosInstance.ts";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { defaultSelfTokenHeaders } from "../shared";

async function postJob({
  companyName,
  formData,
}: {
  companyName: string;
  formData: any;
}) {
  const { data } = await axiosInstanceNext.post(
    `/api/companies/${companyName}/jobs`,
    { ...formData },
    defaultSelfTokenHeaders
  );
  return data;
}

async function putJob({
  companyName,
  jobId,
  formData,
}: {
  companyName: string;
  jobId: string;
  formData: any;
}) {
  const { data } = await axiosInstanceNext.put(
    `/api/companies/${companyName}/jobs/${jobId}`,
    { ...formData },
    defaultSelfTokenHeaders
  );
  return data;
}

async function putJobState({
  companyName,
  jobId,
  jobState,
}: {
  companyName: string;
  jobId: string;
  jobState: "公開" | "暫停" | "隱藏"
}) {
  const { data } = await axiosInstanceNext.put(
    `/api/companies/${companyName}/jobs/${jobId}/jobState`,
    { jobState },
    defaultSelfTokenHeaders
  );
  return data;
}

async function deleteJob({
  companyName,
  jobId,
}: {
  companyName: string;
  jobId: string;
}) {
  const { data } = await axiosInstanceNext.delete(
    `/api/companies/${companyName}/jobs/${jobId}`,
    defaultSelfTokenHeaders
  );
  return data;
}

export function usePostJob(companyName: string) {
  const router = useRouter()
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postJob,
    onSuccess: () => {
      queryClient.invalidateQueries([companyName]);
      router.push(`companies/${companyName}/jobs`)
      // setTimeout(() => router.push(`companies/${companyName}/jobs`), 1500)
    },
  });

  return mutation;
}

export function usePutJob(companyName: string, jobId: string) {
  const router = useRouter()
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: putJob,
    onSuccess: () => {
      queryClient.invalidateQueries([companyName]); //jobId
      setTimeout(() => router.push(`companies/${companyName}/jobs`), 1500)
    },
  });

  return mutation;
}

export function usePutJobState(companyName: string, jobId: string) {
  const router = useRouter()
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: putJobState,
    onSuccess: () => {
      queryClient.invalidateQueries([companyName]); //jobId
      router.refresh()
    },
  });

  return mutation;
}

export function useDeleteJob(companyName: string, jobId: string) {
  const router = useRouter()
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries([companyName]); //jobId
      router.refresh()
    },
  });

  return mutation;
}
