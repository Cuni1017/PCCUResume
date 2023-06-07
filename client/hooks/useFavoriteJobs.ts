import { axiosInstance } from "@/axiosInstance.ts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { defaultSelfTokenHeaders } from "./shared";
import { queryKeys } from "@/tanstack-query/constant";
import { Role } from "@/redux/store";

const sharedGetEndpoint = ({ name, id, username, role }: { name: string; id: string; username: string, role: Role }) => {
  if (role.includes("TEACHER")) {
    return `teacher/${id}`
  }
  else if (role.includes("COMPANY")) {
    return `company/${name}`
  }
  else if (role.includes("STUDENT")) {
    return `students/${username}`
  }
}

async function getFavoriteJobs({ name, id, username, role }: { name: string; id: string; username: string, role: Role }) {
  if (!username && !name && !id && !role) return []

  const { data } = await axiosInstance.get(
    `/v1/${sharedGetEndpoint({ name, id, username, role })}/user-like`,
    defaultSelfTokenHeaders
  );

  return data.data;
}

async function postFavoriteJob({ name, id, username, role, vacancyId }: { name: string; id: string; username: string, role: Role, vacancyId: string }) {
  if (!username || !vacancyId) return

  const { data } = await axiosInstance.post(
    `/v1/${sharedGetEndpoint({ name, id, username, role })}/user-like/${vacancyId}`, null,
    defaultSelfTokenHeaders
  );

  return data.data;
}

async function deleteFavoriteJob({ name, id, username, role, vacancyId }: { name: string; id: string; username: string, role: Role, vacancyId: string }) {
  if (!username || !vacancyId) return

  const { data } = await axiosInstance.delete(
    `/v1/${sharedGetEndpoint({ name, id, username, role })}/user-like/${vacancyId}`,
    defaultSelfTokenHeaders
  );

  return data.data;
}

export function useGetFavoriteJobs({ name, id, username, role }: { name: string; id: string; username: string, role: Role }) {
  const query = useQuery({
    queryKey: [username, queryKeys.favoriteJobs],
    queryFn: () => getFavoriteJobs({ name, id, username, role }),
    staleTime: 10 * 60 * 1000,
  });
  const { data = [], isFetching } = query
  return { data, isFetching }
}

export function usePostFavoriteJob(username: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postFavoriteJob,
    onSuccess: () => {
      queryClient.invalidateQueries([username, queryKeys.favoriteJobs]);
    },
  });

  return mutation;
}

export function useDeleteFavoriteJob(username: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteFavoriteJob,
    onSuccess: () => {
      queryClient.invalidateQueries([username, queryKeys.favoriteJobs]);
    },
  });

  return mutation;
}