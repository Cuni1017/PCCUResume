// import { axiosInstance } from "@/axiosInstance.ts";
// import { getCookie } from "cookies-next";
// import { useRouter } from "next/navigation";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { queryKeys } from "@/tanstack-query/constant";
// import { useSnackbar } from "@mui/base";

// const JWT = getCookie("JWT");

// async function postJob({
//   companyName,
//   formData,
// }: {
//   companyName: string;
//   formData: any;
// }) {
//   const { data } = await axiosInstance.post(
//     `/api/companies/${companyName}/jobs`,
//     { ...formData },
//     {
//       headers: {
//         Authorization: `Bearer ${JWT}`,
//       },
//     }
//   );
//   return data;
// }
