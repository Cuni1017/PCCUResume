import { axiosInstance } from "@/axiosInstance.ts";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;
  const options = {
    headers: {
      Authorization: bearerToken,
    },
  };
  const { userId, resumeId } = req.query;
  const { endpoint, endpointId, formData } = req.body;

  console.log(userId, resumeId);
  console.log(endpoint, endpointId, formData);

  if (req.method === "POST") {
    try {
      const response = await axiosInstance.post(
        `/students/${userId}/resumes/${resumeId}/${endpoint}`,
        options,
        formData
      );
      if (response.status === 200) return res.status(200).json(response.data);
    } catch (error) {
      console.log(error, `POST ${endpoint}`);
    }
  }

  // if (req.method === "DELETE") {
  //   try {
  //     const response = await axiosInstance.delete(
  //       `/students/${userId}/resumes/${resumeId}`,
  //       options
  //     );
  //     if (response.status === 200) return res.status(200).json(response.data);
  //   } catch (error) {
  //     console.log(error, "DELETE resume");
  //   }
  // }

  return res.status(200).json({ message: "HI" });

  return res.status(405).json({ errorMessage: "Method not allow" });
}
