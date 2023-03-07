import { NextApiRequest, NextApiResponse } from "next";
import { axiosInstance } from "@/axiosInstance.ts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;
  const userId = req.query.userId;
  console.log(userId);

  if (req.method === "GET") {
    if (!userId) {
      return res.status(400).json({ errorMessage: "沒有使用者ID" });
    }

    try {
      const response = await axiosInstance.get(`/students/${userId}/resumes`, {
        headers: {
          Authorization: bearerToken,
        },
      });
      if (response.status === 200) return res.status(200).json(response.data);
    } catch (error) {
      console.log(error, "GETresumes");
    }
    return res.status(200).json({ errorMessage: "something wrong" });
  }

  if (req.method === "POST") {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ errorMessage: "未填寫正確" });
    }

    try {
      const response = await axiosInstance.post(
        `/students/${userId}/resumes`,
        { name },
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      );
      if (response.status === 200) return res.status(200).json(response.data);
    } catch (error) {
      console.log(error, "POSTresumes");
    }
    return res
      .status(400)
      .json({ errorMessage: "something wrong In PostResume" });
  }

  return res.status(405).json({ errorMessage: "Method not allow" });
}
