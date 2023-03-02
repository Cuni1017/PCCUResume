import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const id = params.id;

  const { searchParams } = req.nextUrl;
  // console.log(req.nextUrl);

  const sort = searchParams.get("sort");

  return NextResponse.json(
    {
      message: "Hello NextJs",
      id,
      sort,
    },
    {
      status: 200,
    }
  );
}
