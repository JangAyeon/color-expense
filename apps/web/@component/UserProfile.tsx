"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfile, updateUserProfile } from "../@utils/apis/user";
import { queryKeys } from "../@utils/query/query.control";
import { useLogout } from "../@hook/useAuth";

export default function UserProfile() {
  const { handleLogout } = useLogout();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.user.base,
    queryFn: () => fetchUserProfile(""),
    staleTime: 1000 * 60 * 5,
  });

  const [formData, setFormData] = useState({
    name: data?.name ?? "",
    email: data?.email ?? "",
    phone: data?.phone ?? "",
  });

  // Mutation (업데이트용)
  const mutation = useMutation({
    mutationFn: (newData: typeof formData) => updateUserProfile(newData),
    onSuccess: (updatedData) => {
      // 캐시 수동 업데이트 (더 깔끔)
      queryClient.setQueryData(queryKeys.user.base, updatedData);
      alert("저장되었습니다!");
    },
    onError: () => {
      alert("저장 실패");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    mutation.mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>에러 발생</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">내 프로필</h1>
      <div className="flex flex-col gap-2">
        <div>
          <label>이름</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>이메일</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>전화번호</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={mutation.isPending}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {mutation.isPending ? "저장 중..." : "저장"}
        </button>
      </div>

      <button onClick={() => handleLogout()}>로그아웃</button>
    </div>
  );
}
