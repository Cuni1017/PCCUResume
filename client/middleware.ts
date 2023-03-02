import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get("authorization") as string;
  if (!bearerToken) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request1" }),
      { status: 401 }
    );
  }

  const token = bearerToken.split(" ")[1]; //去掉 bearer
  if (!token) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request2" }),
      { status: 401 }
    );
  }

  console.log("I AM MIDDLEWARE AND I WAS CALLED BEFORE THE ENDPOINT");
}

export const config = {
  matcher: ["/api/auth/me"],
};
