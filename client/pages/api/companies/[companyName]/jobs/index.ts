import { NextApiRequest, NextApiResponse } from "next";
import { axiosInstance } from "@/axiosInstance.ts";
import validator from "validator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;

  const { companyName } = req.query;
  // const { formData } = req.body;

  // console.log(req.body);
  // console.log(companyName);

  const options = {
    headers: {
      Authorization: bearerToken,
    },
  };

  if (req.method === "POST" || req.method === "PUT") {
    return res
      .status(200)
      .json({ message: "hi", body: req.body, header: options });
  }

  return res.status(405).json({ errorMessage: "Method not allow" });
}
