import { axiosInstance } from "@/axiosInstance.ts";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;
  const { userId, resumeId } = req.query;

  if (req.method === "GET") {
    try {
      const response = await axiosInstance.get(
        `/v1/resumes/${resumeId}`,
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      );
      if (response.status === 200) return res.status(200).json(response.data);
    } catch (error) {
      console.log(error, "GET resume");
      return res.status(404).json({ errorMessage: "Not Found" })
    }
  }

  if (req.method === "DELETE") {
    try {
      const response = await axiosInstance.delete(
        `/students/${userId}/resumes/${resumeId}`,
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      );
      if (response.status === 200) return res.status(200).json(response.data);
    } catch (error) {
      console.log(error, "DELETE resume");
    }
  }

  return res.status(405).json({ errorMessage: "Method not allow" });
}
