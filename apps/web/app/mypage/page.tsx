"use client";

import { useRouter } from "next/navigation";
export default function MyPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/signout", {
      method: "POST",
    });

    router.replace("/"); // 홈으로 이동
  };

  //   // accessToken으로 백엔드 사용자 정보 요청
  //   const res = await fetch(`${process.env.BACKEND_URL}/me`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     cache: "no-store",
  //   });

  //   const user = await res.json();

  return (
    <div>
      안녕하세요,
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}
