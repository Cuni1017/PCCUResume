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

  // console.log(payload, "123")
  const { id, username, name } = payload

  let user;
  switch (payload.id[0]) {
    case "S":
      try {
        const { data: { data: { studentId, studentName, studentUsername, studentEmail, studentNumber, studentImageUrl, pccuId, role } } } = await axiosInstance.get(`/students/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        user = {
          id: studentId,
          username: studentUsername,
          name: studentName,
          email: studentEmail,
          phone: studentNumber,
          role,
          imageURL: studentImageUrl,
          isValid: role !== "USER"
        }
      } catch (error) {
        console.log(error, "me S")
      }
      break
    case "C":
      try {
        const { data: { data: { companyId, companyName, companyUsername, companyEmail, companyNumber, companyImageUrl, role } } } = await axiosInstance.get(`/company/${name}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        user = {
          id: companyId,
          username: companyUsername,
          name: companyName,
          email: companyEmail,
          phone: companyNumber,
          role,
          imageURL: companyImageUrl,
          isValid: role !== "USER"
        }
      } catch (error) {
        console.log(error, "me C")
      }
      break
    case "T":
      break
  }

  // console.log(user)
  return res.status(200).json(user);
}
