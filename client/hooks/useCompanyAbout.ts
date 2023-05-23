import { axiosInstance } from "@/axiosInstance.ts";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/tanstack-query/constant";

const JWT = getCookie("JWT");

const defaultHeaders = {
  headers: {
    Authorization: `Bearer ${JWT}`,
    "Content-Type": "Application/json"
  },
}

async function getCompanyAbout({ companyName, type }: { companyName: string, type?: "basic" | "service" | "welfare" }) {
  const { data } = await axiosInstance.get(
    `company/${companyName}/company-about${type ? `-${type}` : ""}`,
    defaultHeaders
  );

  return data.data;
}

async function postCompanyAbout({ companyName, type, formData }: { companyName: string, type: "basic" | "service" | "welfare", formData: any }) {
  const { data } = await axiosInstance.post(
    `company/${companyName}/company-about-${type}`,
    { ...formData },
    defaultHeaders
  );

  return data.data;
}

async function putCompanyAbout({ companyName, type, formData }: { companyName: string, type: "basic" | "service" | "welfare", formData: any }) {
  const { data } = await axiosInstance.put(
    `company/${companyName}/company-about-${type}`,
    { ...formData },
    defaultHeaders
  );

  return data.data;
}

export function useGetCompanyAbout({ companyName, type }: { companyName: string, type?: "basic" | "service" | "welfare" }) {
  const query = useQuery({
    queryKey: type ? [companyName, type] : [companyName],
    queryFn: () => getCompanyAbout({ companyName, type }),
    staleTime: 200000,
  });

  const { data = [], isFetching } = query

  return { data, isFetching };
}

export function usePostCompanyAbout({ companyName, type }: { companyName: string, type: "basic" | "service" | "welfare" }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postCompanyAbout,
    onSuccess: () => {
      queryClient.invalidateQueries([companyName]);
      queryClient.invalidateQueries([companyName, type]);
    },
  });

  return mutation;
}

export function usePutCompanyAbout({ companyName, type }: { companyName: string, type: "basic" | "service" | "welfare" }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: putCompanyAbout,
    onSuccess: () => {
      queryClient.invalidateQueries([companyName]);
      queryClient.invalidateQueries([companyName, type]);
    },
  });

  return mutation;
}



// 圖片上傳
const imageHeaders = {
  headers: {
    Authorization: `Bearer ${JWT}`,
    "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>"
  }
}

async function postCompanyImage({ companyName, formData, type }: { companyName: string, formData: any, type: "logo" | "background" }) {
  const { data } = await axiosInstance.post(
    `company/${companyName}/image/company-${type}`,
    formData,
    imageHeaders
  );

  return data.data;
}

export function usePostCompanyImage({ companyName }: { companyName: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postCompanyImage,
    onSuccess: () => {
      queryClient.invalidateQueries([companyName]);
    },
  });

  return mutation;
}