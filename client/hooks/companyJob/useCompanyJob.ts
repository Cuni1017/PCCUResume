import { axiosInstance, axiosInstanceNext } from "@/axiosInstance.ts";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/tanstack-query/constant";


const JWT = getCookie("JWT");

// -------company
async function getCompany({
  companyName
}: {
  companyName: string
}) {
  const { data } = await axiosInstance.get(
    `company/${companyName}`,
    {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
  );
  return data.data;
}

export function useGetCompany(companyName: string) {
  const query = useQuery({
    queryKey: [companyName],
    queryFn: () => getCompany({ companyName }),
    staleTime: 200000,
  });
  const { data = [], isFetching } = query;
  return { data, isFetching };
}


// -------companyJob
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
    {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
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
    {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
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
    {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
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
    {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
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
