import { NextRequest, NextResponse } from "next/server";
// import { useRouter } from "next/navigation";

const NextUrl = "http://localhost:3000";

export function middleware(req: NextRequest, res: NextResponse) {

  // !普通切換路徑
  if (!req.url.includes("api")) {
    const JWT = req.cookies.get("JWT");
    if (!JWT) {
      console.log("no jwt");
      return NextResponse.redirect(NextUrl);
    }
  } else {
    // !api call
    const bearerToken = req.headers.get("authorization") as string;
    if (!bearerToken) {
      return new NextResponse(
        JSON.stringify({ errorMessage: "Unauthorized request" }),
        { status: 401 }
      );
    }

    const token = bearerToken.split(" ")[1]; //去掉 bearer
    if (!token) {
      return new NextResponse(
        JSON.stringify({ errorMessage: "Unauthorized request" }),
        { status: 401 }
      );
    }
  }

}

export const config = {
  matcher: [
    "/api/auth/me",
    "/api/students/:path*",
    "/resumes/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
