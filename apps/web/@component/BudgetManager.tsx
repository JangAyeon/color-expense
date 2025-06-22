"use client";

import React, { useState, useEffect } from "react";
import { useBudget } from "../@hook/useBudget";

export default function BudgetManager({
  initialYear,
  initialMonth,
}: {
  initialYear: number;
  initialMonth: number;
}) {
  const [year, setYear] = useState<number>(initialYear);
  const [month, setMonth] = useState<number>(initialMonth);
  const { query, mutation } = useBudget(year, month);

  const [inputAmount, setInputAmount] = useState<number>(0);

  // 예산 데이터가 바뀌면 inputAmount 업데이트
  useEffect(() => {
    if (query.data) setInputAmount(query.data.budget);
  }, [query.data]);

  const handleSave = () => {
    if (typeof inputAmount !== "number" || inputAmount < 0) {
      alert("예산 금액은 0 이상의 숫자여야 합니다.");
      return;
    }
    console.log("handlesave");

    //TODO
    mutation.mutate({ year, month, budget: inputAmount });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">월별 예산 관리</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          min="2000"
          max="2100"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded p-2 flex-1"
          aria-label="년도 입력"
        />
        <input
          type="number"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border rounded p-2 w-20"
          aria-label="월 입력"
        />
      </div>

      <label className="block mb-1 font-medium">
        예산 금액 (원 단위){inputAmount}
      </label>
      <input
        type="number"
        value={inputAmount}
        onChange={(e) => {
          const val = Number(e.target.value);
          setInputAmount(isNaN(val) ? 0 : val);
        }}
        className="border rounded p-2 w-full mb-4"
        aria-label="예산 금액 입력"
      />

      <button
        onClick={handleSave}
        disabled={mutation.isPending}
        className={`w-full py-2 rounded text-white ${
          mutation.isPending ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
        aria-busy={mutation.isPending}
      >
        {query.data?.hasBudget ? "예산 수정" : "예산 생성"}
      </button>

      {query.isLoading && <p className="mt-2 text-gray-500">로딩 중...</p>}
      {query.isError && (
        <p className="mt-2 text-red-500">
          예산 정보를 불러오는데 실패했습니다.
        </p>
      )}
      {mutation.isError && (
        <p className="mt-2 text-red-500">예산 저장에 실패했습니다.</p>
      )}
      {mutation.isSuccess && (
        <p className="mt-2 text-green-600">예산이 저장되었습니다!</p>
      )}
    </div>
  );
}
