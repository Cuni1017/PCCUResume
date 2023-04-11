import { NextApiRequest, NextApiResponse } from "next";
import { axiosInstance } from "@/axiosInstance.ts";
import { Skill } from "@/app/companies/[slug]/components/SkillPicker";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;

  const { companyName, jobId } = req.query;
  const { jobState } = req.body

  const options = {
    headers: {
      Authorization: bearerToken,
    },
  };

  if (req.method === "PUT") {
    try {
      const response = await axiosInstance.put(`/company/vacancies/${jobId}/vacancies-watch-type`,
        { watchType: jobState },
        options
      )
      if (response.status === 200) return res.status(200).json(response.data);
    } catch (error) {
      console.log(error, `PUT ${companyName} jobState`)
      return res.status(400).json({ errorMessage: "PUT JobState 錯誤" })
    }
  }

  return res.status(405).json({ errorMessage: "Method not allow" });

}