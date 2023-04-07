import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { setCookie } from "cookies-next";
import { axiosInstance } from "@/axiosInstance.ts";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const errors: string[] = [];
    const { username, password } = req.body;

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
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(401).json({ errorMessage: errors[0] });
    }

    let token: null | string = null;
    let user: any;
    try {
      const response = await axiosInstance.post("/login", {
        username,
        password,
      });
      const {
        data: { data: { authenticationDto: { token: JWT }, object } },
      } = response;
      token = JWT;

      let role = object.role;
      let isValid: boolean = true;
      // 未經認證的STD或CPN，role會是USER，但data的key會不一樣
      if (object.role === "USER") {
        if (object.id[0] === "S") {
          role = "STUDENT"
        } else if (object.id[0] === "C") {
          role = "COMPANY"
        }
        isValid = false
      }

      switch (role) {
        case "STUDENT":
          user = {
            id: object.studentId,
            username: object.studentUsername,
            name: object.studentName,
            role: object.role,
            imageURL: object.studentImageUrl,
            isValid
          }
          break
        case "COMPANY":
          user = {
            id: object.companyId,
            username: object.companyUsername,
            name: object.companyName,
            role: object.role,
            imageURL: object.companyImageUrl,
            isValid
          }
          break
        case "TEACHER":
          user = {
            id: object.teacherId,
            username: object.teacherUsername,
            name: object.teacherName,
            role: object.role,
            imageURL: object.teacherImageUrl,
            isValid
          }
          break
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({ errorMessage: error });
    }
    if (token) {
      setCookie("JWT", token, { req, res, maxAge: 24 * 60 * 60 * 1 }); //maxAge單位好像是秒
      const decoded = jwt.decode(token) as {
        id: string;
        username: string;
        name: string;
        imageURL: string;
        role: string;
      };
      return res.status(200).json(user);
    } else {
      return res.status(401).json({ errorMessage: "Unauthorized request" });
    }
  }

  return res.status(405).json({ errorMessage: "Method not allow" });
}
