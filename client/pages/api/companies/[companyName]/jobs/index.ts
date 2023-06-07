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

  const { companyName } = req.query;
  const { county, skills } = req.body;

  // console.log(req.body);
  // console.log(companyName);
  const formData = req.body
  const countyId = getCountyId(county)
  if (countyId < 1) return res.status(400).json({ errorMessage: "錯誤的城市ID" })
  formData.county = [countyId];
  formData.skill = skills.map((tech: Skill) => tech.skillId)
  delete formData.skills
  // console.log(formData)

  const options = {
    headers: {
      Authorization: bearerToken,
    },
  };

  // 新增職缺到companyName
  if (req.method === "POST") {
    try {
      const response = await axiosInstance.post(`company/${companyName}/vacancies`,
        formData,
        options
      )
      if (response.status === 200) return res.status(200).json(response.data);
    } catch (error) {
      console.log(error, `POST ${companyName} job`)
      return res.status(400).json({ errorMessage: "POST Job 錯誤" })
    }
  }
  // return res
  //   .status(200)
  //   .json({ message: "hi", body: req.body, header: options });

  return res.status(405).json({ errorMessage: "Method not allow" });
}
