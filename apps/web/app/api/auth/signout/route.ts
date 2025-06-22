// apps/web/app/api/auth/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).delete("access_token"); // 👈 삭제

  return NextResponse.json({ success: true });
}
