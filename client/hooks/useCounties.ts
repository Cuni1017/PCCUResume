import { axiosInstance } from "@/axiosInstance.ts";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/tanstack-query/constant";


interface County {
  countyId: number;
  countyName: string;
}

async function fetchCounties() {
  const { data }: { data: County[] } = await axiosInstance.get("/vacancies/counties");
  return data
}

export function useGetSkills() {
  const query = useQuery({
    queryKey: [queryKeys.counties],
    queryFn: () => fetchCounties(),
    staleTime: 200000,
  });

  const { data = [], isFetching } = query;
  return { data, isFetching };
}