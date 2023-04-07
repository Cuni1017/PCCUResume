import { axiosInstance } from "@/axiosInstance.ts";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/tanstack-query/constant";

interface Skill {
  skillId: number;
  skillName: string;
}

async function fetchSkills() {
  const { data }: { data: Skill[] } = await axiosInstance.get("/vacancies/skills");
  return data
}

export function useGetSkills() {
  const query = useQuery({
    queryKey: [queryKeys.skills],
    queryFn: () => fetchSkills(),
    staleTime: 200000,
  });

  const { data = [], isFetching } = query;
  return { data, isFetching };
}