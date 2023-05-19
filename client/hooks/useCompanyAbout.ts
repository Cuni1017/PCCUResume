import { axiosInstance } from "@/axiosInstance.ts";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/tanstack-query/constant";

const JWT = getCookie("JWT");

const headers = {
  headers: {
    Authorization: `Bearer ${JWT}`,
    "Content-Type": "Application/json"
  },
}

async function getCompanyAbout({ companyName, type }: { companyName: string, type?: "basic" | "service" | "welfare" }) {
  const { data } = await axiosInstance.get(
    `company/${companyName}/company-about${type ? `-${type}` : ""}`,
    headers
  );

  return data.data;
}

async function postCompanyAbout({ companyName, type, formData }: { companyName: string, type: "basic" | "service" | "welfare", formData: any }) {
  const { data } = await axiosInstance.post(
    `company/${companyName}/company-about-${type}`,
    { ...formData },
    headers
  );

  return data.data;
}

async function putCompanyAbout({ companyName, type, formData }: { companyName: string, type: "basic" | "service" | "welfare", formData: any }) {
  const { data } = await axiosInstance.put(
    `company/${companyName}/company-about-${type}`,
    { ...formData },
    headers
  );

  return data.data;
}

export function useGetCompanyAbout({ companyName, type }: { companyName: string, type?: "basic" | "service" | "welfare" }) {
  const query = useQuery({
    queryKey: [companyName, type],
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
