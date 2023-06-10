import { axiosInstance } from "@/axiosInstance.ts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { defaultSelfTokenHeaders } from "../shared";
import { queryKeys } from "@/tanstack-query/constant";

async function getApplies(studentId: string) {
  if (!studentId) return

  const { data } = await axiosInstance.get(
    `/students/${studentId}/apply-for-job`,
    defaultSelfTokenHeaders
  );

  return data.data;
}

export function useGetApplies(studentId: string) {
  const query = useQuery({
    queryKey: [studentId],
    queryFn: () => getApplies(studentId),
    staleTime: 200000,
  });
  const { data = [], isFetching } = query
  return { data, isFetching }
}