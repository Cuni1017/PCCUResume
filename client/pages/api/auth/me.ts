import { NextApiRequest, NextApiResponse } from "next";
import { axiosInstance } from "@/axiosInstance.ts";
import jwt from "jsonwebtoken";
import { User } from "@/redux/store";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;
  const token = bearerToken.split(" ")[1]; //去掉 bearer
  const payload = jwt.decode(token) as User;

  if (!payload)
    return res.status(401).json({ errorMessage: "Unauthorized request" });

  if (!payload.id) {
    return res.status(401).json({
      errorMessage: "Unauthorized request",
    });
  }

  try {
    const {
      data: {
        data: { resume, student },
      },
    } = await axiosInstance.get(`/students/${payload.id}`, {
      headers: {
        Authorization: bearerToken,
      },
    });

  } catch (error) {
    console.log(error, "me");
  }

  return res.status(200).json({ ...payload });
}
