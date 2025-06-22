import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { year, month, amount } = body;
  const dateNotNumber =
    typeof year !== "number" ||
    typeof month !== "number" ||
    typeof amount !== "number";

  if (dateNotNumber) {
    return NextResponse.json(
      { message: "year, month, and amount are required and must be numbers" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/budget`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ year, month, amount }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to create or update budget" },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { message: "Success to create or update budget" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
