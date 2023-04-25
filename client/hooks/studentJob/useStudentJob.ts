import { axiosInstance } from "@/axiosInstance.ts";
import { getCookie } from "cookies-next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const JWT = getCookie("JWT");

async function getApplies(studentId: string) {
  if (!studentId) return

  const { data } = await axiosInstance.get(
    `/students/${studentId}/apply-for-job`,
    {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
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