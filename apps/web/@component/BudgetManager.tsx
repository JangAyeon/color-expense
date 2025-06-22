"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBudgetStatus, upsertBudget } from "../@utils/apis/budget";

export default function BudgetManager() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // year, month 가져오기 (없으면 기본값은 오늘 기준)
  const today = new Date();
  const year = parseInt(
    searchParams.get("year") ?? today.getFullYear().toString()
  );
  const month = parseInt(
    searchParams.get("month") ?? (today.getMonth() + 1).toString()
  );

  const queryClient = useQueryClient();

  // 예산 상태 조회
  const { data, isLoading, isError } = useQuery({
    queryKey: ["budget", year, month],
    queryFn: () => fetchBudgetStatus(year, month, ""),
    staleTime: 1000 * 60 * 5,
  });

  // 로컬 상태로 form 데이터 관리 (수정용)
  const [formBudget, setFormBudget] = useState<number>(data?.budget ?? 0);

  // 예산 수정 뮤테이션
  const mutation = useMutation({
    mutationFn: () => upsertBudget({ year, month, amount: formBudget }),
    onSuccess: (updated) => {
      queryClient.setQueryData(["budget", year, month], updated);
      alert("예산이 저장되었습니다!");
    },
    onError: () => {
      alert("예산 저장에 실패했습니다.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormBudget(Number(e.target.value));
  };

  const handleSave = () => {
    if (formBudget === undefined || isNaN(formBudget)) {
      alert("올바른 예산 금액을 입력하세요.");
      return;
    }
    mutation.mutate();
  };

  if (isLoading) return <div>로딩중...</div>;
  if (isError || !data) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {year}년 {month}월 예산 관리
      </h2>
      <div className="mb-4">
        <label className="block mb-1">예산 금액 (원):</label>
        <input
          type="number"
          value={formBudget ?? ""}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          min={0}
        />
      </div>
      <div className="mb-4">
        <p>잔여 예산: {data.remaining}원</p>
        <p>소비 금액: {data.spent}원</p>
      </div>
      <button
        onClick={handleSave}
        disabled={mutation.isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {mutation.isPending ? "저장중..." : "저장"}
      </button>
    </div>
  );
}
