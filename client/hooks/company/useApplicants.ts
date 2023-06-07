import { axiosInstance } from "@/axiosInstance.ts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { defaultSelfTokenHeaders } from "../shared";

async function getApplies(companyName: string) {
  const { data } = await axiosInstance.get(
    `/company/${companyName}/company-for-job`,
    defaultSelfTokenHeaders
  );

  return data.data;
}

async function putApply({
  applyId,
  applyType
}: {
  applyId: string;
  applyType: string;
}) {
  const { data } = await axiosInstance.put(
    `/company/company-for-job/${applyId}`,
    { applyType },
    defaultSelfTokenHeaders
  );
  return data;
}

async function putApplyTime({
  applyId,
  applyStartTime,
  applyEndTime
}: {
  applyId: string;
  applyStartTime: string, //YYYY-MM-DD
  applyEndTime: string
}) {
  console.log(`/company/company-for-job/${applyId}/insert-apply-time`)
  const { data } = await axiosInstance.put(
    `/company/company-for-job/${applyId}/insert-apply-time`,
    { applyStartTime, applyEndTime },
    defaultSelfTokenHeaders
  );
  return data;
}

export function useGetApplies(companyName: string) {
  const query = useQuery({
    queryKey: [companyName],
    queryFn: () => getApplies(companyName),
    staleTime: 200000,
  });

  const { data = [], isFetching } = query

  return { data, isFetching };
}

export function usePutApply(companyName: string, studentId?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: putApply,
    onSuccess: () => {
      queryClient.invalidateQueries([companyName]);
      studentId ?
        queryClient.invalidateQueries([studentId]) : null;
    },
  });

  return mutation;
}

export function usePutApplyTime(companyName: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: putApplyTime,
    onSuccess: () => {
      queryClient.invalidateQueries([companyName]); //applyId
    },
  });

  return mutation;
}