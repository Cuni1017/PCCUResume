import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { axiosInstance } from "@/axiosInstance.ts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const errors: string[] = [];
    const {
      identity,
      username,
      password,
      name,
      email,
      pccuId,
      teacherId,
      companyName,
      companyTitle,
      companyNumber,
      companyCounty,
      companyDistrict,
      companyAddress,
    } = req.body;

    const validationSchema = [
      {
        valid: validator.isLength(username, {
          min: 1,
        }),
        errorMessage: "Username is invalid",
      },
      {
        valid: validator.isLength(password, {
          min: 1,
        }),
        errorMessage: "Password is invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isLength(name, {
          min: 1,
        }),
        errorMessage: "Name is invalid",
      },
    ];

    switch (identity) {
      case "STD":
        validationSchema.push({
          valid: validator.isLength(pccuId, {
            min: 1,
          }),
          errorMessage: "pccuId is invalid",
        });
        break;
      case "CPN":
        validationSchema.push({
          valid: validator.isLength(companyName, {
            min: 1,
          }),
          errorMessage: "companyName is invalid",
        });
        validationSchema.push({
          valid: validator.isLength(companyTitle, {
            min: 1,
          }),
          errorMessage: "companyTitle is invalid",
        });
        validationSchema.push({
          valid: validator.isLength(companyNumber, {
            min: 1,
          }),
          errorMessage: "companyNumber is invalid",
        });
        validationSchema.push({
          valid: validator.isLength(companyCounty, {
            min: 1,
          }),
          errorMessage: "companyCounty is invalid",
        });
        validationSchema.push({
          valid: validator.isLength(companyDistrict, {
            min: 1,
          }),
          errorMessage: "companyDistrict is invalid",
        });
        validationSchema.push({
          valid: validator.isLength(companyAddress, {
            min: 1,
          }),
          errorMessage: "companyAddress is invalid",
        });
        break;
      case "TCH":
        validationSchema.push({
          valid: validator.isLength(teacherId, {
            min: 1,
          }),
          errorMessage: "teacherId is invalid",
        });
        break;
      default:
        return res.status(400).json({ errorMessage: "錯誤的身分" });
    }

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }

    try {
      let response;
      switch (identity) {
        case "STD":
          response = await axiosInstance.post("/register/student", {
            studentUsername: username,
            studentPassword: password,
            studentName: name,
            studentEmail: email,
            pccuId,
          });
          break;
        case "CPN":
          response = await axiosInstance.post("/register/company", {
            companyUsername: username,
            companyPassword: password,
            companyEmail: email,
            companyName,
            companyTitle,
            companyNumber,
            companyCounty,
            companyDistrict,
            companyAddress,
          });
          break;
        case "TCH":
          response = await axiosInstance.post("/register/teacher", {
            teacherUsername: username,
            teacherPassword: password,
            teacherName: name,
            studentEmail: email,
            teacherId,
          });
          break;
      }
      return res.status(200).json({ response: response?.data });
    } catch (error: any) {
      return res.status(401).json({ errorMessage: error });
    }

    return res.status(200).json({ message: "OK" });
  }
  return res.status(404).json("Unknown endpoint");
}
