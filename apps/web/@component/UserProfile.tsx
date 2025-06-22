"use client";
import { useState } from "react";
import { useLogout } from "../@hook/useAuth";
import { useGetMyInfo, useUpdateMyInfo } from "../@hook/useMyInfo";

export default function MyPage() {
  const { handleLogout } = useLogout();

  const { user, isLoading, isError } = useGetMyInfo();

  const { mutate: updateProfile } = useUpdateMyInfo();

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  const handleSubmit = () => {
    updateProfile({ name, phone, email });
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !user) return <div>로그인이 필요합니다</div>;

  return (
    <div>
      안녕하세요, {user.name}님 ({user.email}) ({user.name}) ({user.phone})
      <div>
        <label>
          이름
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          이메일
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          전화번호
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <button onClick={handleSubmit}>수정하기</button>
      </div>
      <button onClick={() => handleLogout()}>로그아웃</button>
    </div>
  );
}
