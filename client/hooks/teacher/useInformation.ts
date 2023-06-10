import { axiosInstance } from "@/axiosInstance.ts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { defaultSelfTokenHeaders, fileHeaders } from "../shared";
import { queryKeys } from "@/tanstack-query/constant";

// 公告
async function getInformation({ page }: { page: number }) {
  const { data } = await axiosInstance.get(
    `v1/teacher/teacher-file-form?page=${page}`,
    defaultSelfTokenHeaders
  );

  return data.data;
}

async function postInformation({ teacherId, formData }: {
  teacherId: string, formData: any
}) {
  const { data } = await axiosInstance.post(
    `v1/teacher/${teacherId}/teacher-file-form`,
    formData,
    defaultSelfTokenHeaders
  );

  return data.data;
}

async function putInformation({ teacherId, fileId, formData }: {
  teacherId: string, fileId: string, formData: any
}) {
  const { data } = await axiosInstance.put(
    `v1/teacher/${teacherId}/teacher-file-form/${fileId}`,
    formData,
    defaultSelfTokenHeaders
  );

  return data.data;
}

async function deleteInformation({ teacherId, fileId }: {
  teacherId: string, fileId: string
}) {
  const { data } = await axiosInstance.delete(
    `v1/teacher/${teacherId}/teacher-file-form/${fileId}`,
    defaultSelfTokenHeaders
  );

  return data.data;
}

export function useGetInformation({ page }: { page?: number }) {
  const p = page ? page >= 1 ? page : page : 1
  const query = useQuery({
    queryKey: [queryKeys.information],
    queryFn: () => getInformation({ page: p }),
    staleTime: 200000,
  });
  const { data = [], isFetching } = query
  return { data, isFetching }
}

export function usePostInformation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postInformation,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.information]);
    },
  });

  return mutation;
}

export function usePutInformation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: putInformation,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.information]);
    },
  });

  return mutation;
}

export function useDeleteInformation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteInformation,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.information]);
    },
  });

  return mutation;
}


// 公告的檔案
async function postInformationFile({ teacherId, formData }: {
  teacherId: string, formData: any
}) {
  const { data } = await axiosInstance.post(
    `v1/teacher/${teacherId}/teacher-file`,
    formData,
    fileHeaders
  );

  return data.data;
}

async function putInformationFile({ teacherId, fileId, formData }: {
  teacherId: string, fileId: string, formData: any
}) {
  const { data } = await axiosInstance.put(
    `v1/teacher/${teacherId}/teacher-file/${fileId}`,
    formData,
    fileHeaders
  );

  return data.data;
}

async function deleteInformationFile({ teacherId, fileId }: {
  teacherId: string, fileId: string
}) {
  const { data } = await axiosInstance.delete(
    `v1/teacher/${teacherId}/teacher-file/${fileId}`,
    fileHeaders
  );

  return data.data;
}

export function usePostInformationFile({ fileId }: { fileId: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postInformationFile,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.information]);
      queryClient.invalidateQueries([queryKeys.information, fileId]);
    },
  });

  return mutation;
}

export function usePutInformationFile({ fileId }: { fileId: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: putInformationFile,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.information]);
      queryClient.invalidateQueries([queryKeys.information, fileId]);
    },
  });

  return mutation;
}

export function useDeleteInformationFile({ fileId }: { fileId: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteInformationFile,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.information]);
      queryClient.invalidateQueries([queryKeys.information, fileId]);
    },
  });

  return mutation;
}