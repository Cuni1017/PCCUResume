import { axiosInstanceNext } from "@/axiosInstance.ts";
import { getCookie } from "cookies-next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/tanstack-query/constant";

const JWT = getCookie("JWT");

interface Resume {
  resumeId: string;
  userId: string;
  name: string;
  number: string;
  createTime: string;
  school: string;
}

type Resumes = { resume: Resume[] };

async function fetchResumeById(userId: string, resumeId: string) {
  if (!userId || !resumeId) return;

  const { data } = await axiosInstanceNext.get(
    `/api/students/${userId}/resumes/${resumeId}`,
    {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
  );
  return data.data;
}

async function fetchResumes(userId: string) {
  if (!userId) return;

  const { data } = await axiosInstanceNext.get(
    `/api/students/${userId}/resumes`,
    {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
  );
  return data.data.resume;
}

async function newResume({
  userId,
  formData,
}: {
  userId: string;
  formData: { name: string };
}) {
  const { data } = await axiosInstanceNext.post(
    `/api/students/${userId}/resumes`,
    { ...formData },
    {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
  );
  return data;
}

async function deleteResume({
  userId,
  resumeId,
}: {
  userId: string;
  resumeId: string;
}) {
  const { data } = await axiosInstanceNext.delete(
    `/api/students/${userId}/resumes/${resumeId}`,
    {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
  );
  return data;
}

export function useGetResume(userId: string, resumeId: string) {
  const query = useQuery({
    queryKey: ["resume", resumeId],
    queryFn: () => fetchResumeById(userId, resumeId),
    staleTime: 200000,
    enabled: !!userId,
  });
  const { data = [], isFetching } = query;
  return { data, isFetching };
}

export function useGetResumes(userId: string) {
  const query = useQuery({
    queryKey: [queryKeys.resumes],
    queryFn: () => fetchResumes(userId),
    staleTime: 200000,
    enabled: !!userId,
  });
  const { data = [], isFetching } = query;
  return { data, isFetching };
}

export function usePostResume() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: newResume,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.resumes]);
    },
  });

  return mutation;
}

export function useDeleteResume() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteResume,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.resumes]);
    },
  });

  return mutation;
}
