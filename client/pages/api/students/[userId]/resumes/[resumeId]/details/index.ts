import { NextApiRequest, NextApiResponse } from "next";
import { axiosInstance } from "@/axiosInstance.ts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;

  const { userId, resumeId } = req.query;
  const { endpoint, endpointId, formData } = req.body;

  // console.log(req.body);

  // console.log(userId, resumeId);
  // console.log(endpoint, endpointId, formData);

  let neededData: string[];
  switch (endpoint) {
    case "work-hope":
      neededData = ["type", "date"];
      break;
    case "special-skill":
      neededData = ["name", "talk", "special"];
      break;
    case "license":
      neededData = ["name"];
      break;
    case "project-achievments":
      neededData = ["name", "talk", "url", "startTime", "endTime"];
      break;
    case "autobiography":
      neededData = ["chineseAutobiography", "englishAutobiography"];
      break;
    case "work-experience":
      neededData = ["name", "department", "companyName"];
      break;
    case "subject":
      neededData = ["subjectName", "subjectTalk", "subjectScore", "subjectRank", "subjectTotalPeople"]
      break;
    case "skill":
      neededData = ["skillIds"]
      break;
    default:
      return res.status(400).json({ errorMessage: "Unknown Endpoint" });
  }

  if (req.method === "POST" || req.method === "PUT") {
    const fulfill = neededData.every((need) => Object.hasOwn(formData, need));
    if (!fulfill) return res.status(400).json({ errorMessage: "未填寫正確" });
  }

  const options = {
    headers: {
      Authorization: bearerToken,
    },
  };

  if (req.method === "POST") {
    try {
      const response = await axiosInstance.post(
        `/students/${userId}/resumes/${resumeId}/${endpoint}`,
        formData,
        options
      );
      if (response.status === 200) return res.status(200).json(response.data);
    } catch (error) {
      console.log(error, `POST ${endpoint}`);
    }
  } else if (req.method === "PUT") {
    try {
      const response = await axiosInstance.put(
        `/students/${userId}/resumes/${resumeId}/${endpoint}${endpointId ? `/${endpointId}` : ""}`,
        formData,
        options
      );
      if (response.status === 200) return res.status(200).json(response.data);
    } catch (error) {
      console.log(error, `PUT ${endpoint}`);
    }
  } else if (req.method === "DELETE") {
    try {
      const response = await axiosInstance.delete(
        `/students/${userId}/resumes/${resumeId}/${endpoint}/${endpointId}`,
        options
      );
      if (response.status === 200) return res.status(200).json(response.data);
    } catch (error) {
      console.log(error, `DELETE ${endpoint}`);
    }
  }

  return res.status(405).json({ errorMessage: "Method not allow" });
}
