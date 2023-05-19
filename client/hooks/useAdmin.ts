import { axiosInstance } from "@/axiosInstance.ts";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/tanstack-query/constant";
import { ApplyType } from "@/app/companies/[slug]/applicants/components/ApplyActionDialog";

const JWT = getCookie("JWT");

const headers = {
  headers: {
    Authorization: `Bearer ${JWT}`,
    "Content-Type": "Application/json"
  },
}


// 拿近五日的學生、廠商註冊，學生應徵、廠商職缺申請
async function getPlatformNews() {
  const { data } = await axiosInstance.get(
    `/v1/teacher/news`,
    headers
  );

  return data.data;
}

async function getStudentsReview({ page, searchTerm, isReviewed }: { page: number, searchTerm?: string, isReviewed: boolean }) {
  const { data } = await axiosInstance.get(
    `v1/teacher/student-${isReviewed ? "check" : "review"}?page=${page}&limit=10${searchTerm ? `&search=${searchTerm}` : ""}`,
    headers
  );

  return data.data;
}
async function getCompaniesReview({ page, searchTerm, isReviewed }: { page: number, searchTerm?: string, isReviewed: boolean }) {
  const { data } = await axiosInstance.get(
    `v1/teacher/company-${isReviewed ? "check" : "review"}?page=${page}&limit=10${searchTerm ? `&search=${searchTerm}` : ""}`,
    headers
  );

  return data.data;
}
async function getVacanciesReview({ page, searchTerm, isReviewed }: { page: number, searchTerm?: string, isReviewed: boolean }) {
  const { data } = await axiosInstance.get(
    `v1/teacher/vacancies-${isReviewed ? "check" : "review"}?page=${page}&limit=10${searchTerm ? `&search=${searchTerm}` : ""}`,
    headers
  );

  return data.data;
}
async function getAppliesReview({ page }: { page: number }) {
  const { data } = await axiosInstance.get(
    `v1/teacher/apply-review?page=${page}&limit=10`,
    headers
  );

  return data.data;
}

// 審核學生
async function putStudent({
  teacherId,
  studentId,
  role,
}: {
  teacherId: string;
  studentId: string;
  role: "STUDENT" | "DELETE";
}) {
  if (role === "STUDENT") {
    const { data } = await axiosInstance.put(
      `/v1/teacher/${teacherId}/student-review/${studentId}`,
      { role },
      headers
    );

    return data.data;
  } else if (role === "DELETE") {
    const { data } = await axiosInstance.delete(
      `/v1/teacher/${teacherId}/student-review/${studentId}`,
      headers
    );

    return data.data;
  }
}

// 審核廠商
async function putCompany({
  teacherId,
  companyId,
  role,
}: {
  teacherId: string;
  companyId: string;
  role: "COMPANY" | "DELETE";
}) {
  if (role === "COMPANY") {
    const { data } = await axiosInstance.put(
      `/v1/teacher/${teacherId}/company-review/${companyId}`,
      { role },
      headers
    );

    return data.data;
  } else if (role === "DELETE") {
    const { data } = await axiosInstance.delete(
      `/v1/teacher/${teacherId}/company-review/${companyId}`,
      headers
    );

    return data.data;
  }
}

// 審核職缺
async function putVacancy({
  teacherId,
  vacancyId,
  teacherValidType,
}: {
  teacherId: string;
  vacancyId: string;
  teacherValidType: "審核通過" | "審核不通過";
}) {
  const { data } = await axiosInstance.put(
    `/v1/teacher/${teacherId}/vacancies-review/${vacancyId}`,
    { teacherValidType },
    headers
  );

  return data.data;
}

// 變更applyType
async function putApplyType({
  teacherId,
  applyId,
  applyType,
}: {
  teacherId: string;
  applyId: string;
  applyType: ApplyType;
}) {
  const { data } = await axiosInstance.put(
    `/v1/teacher/${teacherId}/apply-review/${applyId}`,
    { applyType },
    headers
  );

  return data.data;
}


export function useGetPlatformNews() {
  const query = useQuery({
    queryKey: [queryKeys.platformNews],
    queryFn: getPlatformNews,
    staleTime: 200000,
  });

  const { data = [], isFetching } = query

  return { data, isFetching };
}

export function useGetStudentsReview({ page, searchTerm, isReviewed }: { page: number, searchTerm?: string, isReviewed: boolean }) {
  const query = useQuery({
    queryKey: searchTerm ? [queryKeys.studentsReview, `isReviewed=${isReviewed}`, searchTerm] : [queryKeys.studentsReview, `isReviewed=${isReviewed}`],
    queryFn: () => getStudentsReview({ page, searchTerm, isReviewed }),
    staleTime: 200000,
  });

  const { data = [], isFetching } = query

  return { data, isFetching };
}

export function useGetCompaniesReview({ page, searchTerm, isReviewed }: { page: number, searchTerm?: string, isReviewed: boolean }) {
  const query = useQuery({
    queryKey: searchTerm ? [queryKeys.companiesReview, `isReviewed=${isReviewed}`, searchTerm] : [queryKeys.companiesReview, `isReviewed=${isReviewed}`],
    queryFn: () => getCompaniesReview({ page, searchTerm, isReviewed }),
    staleTime: 200000,
  });

  const { data = [], isFetching } = query

  return { data, isFetching };
}

export function useGetVacanciesReview({ page, searchTerm, isReviewed }: { page: number, searchTerm?: string, isReviewed: boolean }) {
  const query = useQuery({
    queryKey: searchTerm ? [queryKeys.vacanciesReview, `isReviewed=${isReviewed}`, searchTerm] : [queryKeys.vacanciesReview, `isReviewed=${isReviewed}`],
    queryFn: () => getVacanciesReview({ page, searchTerm, isReviewed }),
    staleTime: 200000,
  });

  const { data = [], isFetching } = query

  return { data, isFetching };
}

export function useGetAppliesReview(page: number) {
  const query = useQuery({
    queryKey: [queryKeys.appliesReview],
    queryFn: () => getAppliesReview({ page }),
    staleTime: 200000,
  });

  const { data = [], isFetching } = query

  return { data, isFetching };
}



export function usePutStudent(studentId: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: putStudent,
    onSuccess: () => {
      queryClient.invalidateQueries([studentId]);
      queryClient.invalidateQueries([queryKeys.platformNews]);
      queryClient.invalidateQueries([queryKeys.studentsReview]);
    },
  });

  return mutation;
}

export function usePutCompany(companyId: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: putCompany,
    onSuccess: () => {
      queryClient.invalidateQueries([companyId]);
      queryClient.invalidateQueries([queryKeys.platformNews]);
      queryClient.invalidateQueries([queryKeys.companiesReview]);
    },
  });

  return mutation;
}

export function usePutVacancy(companyName: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: putVacancy,
    onSuccess: () => {
      queryClient.invalidateQueries([companyName]);
      queryClient.invalidateQueries([queryKeys.platformNews]);
      queryClient.invalidateQueries([queryKeys.vacanciesReview]);
    },
  });

  return mutation;
}

export function usePutApplyType(compamyName: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: putApplyType,
    onSuccess: () => {
      queryClient.invalidateQueries([compamyName]);
      queryClient.invalidateQueries([queryKeys.platformNews]);
      queryClient.invalidateQueries([queryKeys.appliesReview]);
    },
  });

  return mutation;
}