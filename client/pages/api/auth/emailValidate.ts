import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { axiosInstance } from "@/axiosInstance.ts";

let ANSWER: string | null; //後端返回的驗證碼
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const errors: string[] = [];

  if (req.method === "POST") {
    const { email, CAPTCHA } = req.body;
    if (!email) res.status(401).json({ errorMessage: "Email is invalid" });

    if (!validator.isEmail(email)) {
      return res.status(200).json({ errorMessage: "Email is invalid" });
    }

    if (!CAPTCHA) {
      try {
        const response = await axiosInstance.get(
          `/register/sendemail/${email}`
        );
        ANSWER = response.data.data;
        console.log(ANSWER);
      } catch (error) {
        console.log(error, "emailValidate");
      }
    } else {
      if (CAPTCHA !== ANSWER)
        return res.status(401).json({ errorMessage: "CAPTCHA is not correct" });
      else return res.status(200).json({ message: "OK!" });
    }

    return res.status(200).json({ message: "寄送成功" });
  }

  return res.status(404).json({ errorMessage: "Unknown endpoint" });
}
