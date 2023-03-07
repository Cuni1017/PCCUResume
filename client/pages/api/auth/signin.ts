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
    try {
      const res = await axiosInstance.post("/login", {
        username,
        password,
      });
      const {
        data: { token: JWT },
      } = res;
      token = JWT;
    } catch (error) {
      console.log(error);
      return res.status(401).json({ errorMessage: error });
    }

    if (token) {
      setCookie("JWT", token, { req, res, maxAge: 60 * 60 * 1 }); //maxAge單位好像是秒
      const decoded = jwt.decode(token) as {
        id: string;
        username: string;
        sub: string;
      };
      return res.status(200).json({ ...decoded });
    } else {
      return res.status(401).json({ errorMessage: "Unauthorized request" });
    }
  }

  return res.status(404).json("Unknown endpoint");
}
