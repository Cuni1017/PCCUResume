import { NextApiRequest, NextApiResponse } from "next";
import { axiosInstance } from "@/axiosInstance.ts";
import validator from "validator";
import getCountyId from "@/util/getCountyId";
import { Skill } from "@/app/companies/[slug]/components/SkillPicker";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;

  const { companyName, jobId } = req.query;
  const { county, skills } = req.body;

  const options = {
    headers: {
      Authorization: bearerToken,
    },
  };

  if (req.method === "PUT") {
    const formData = req.body
    console.log(formData)

    const countyId = getCountyId(county)
    if (countyId < 1) return res.status(400).json({ errorMessage: "錯誤的城市ID" })
    formData.county = [countyId];
    formData.skill = skills.map((tech: Skill) => tech.skillId)
    delete formData.skills
    console.log(formData)

    let neededData: string[] = [];

    try {
      const response = await axiosInstance.put(`company/${companyName}/vacancies/${jobId}`,
        formData,
        options
      )
      if (response.status === 200) return res.status(200).json(response.data);
    } catch (error) {
      console.log(error, `PUT ${companyName} jobs`)
      return res.status(400).json({ errorMessage: "PUT Job 錯誤" })
    }
  }

  if (req.method === "DELETE") {
    try {
      const response = await axiosInstance.delete(`company/${companyName}/vacancies/${jobId}`,
        options
      )
      if (response.status === 200) return res.status(200).json(response.data);
    } catch (error) {
      console.log(error, `DELETE ${companyName} jobs`)
      return res.status(400).json({ errorMessage: "DELETE Job 錯誤" })
    }
  }

  return res.status(405).json({ errorMessage: "Method not allow" });
}