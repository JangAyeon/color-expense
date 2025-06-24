"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ExpenseCube from "../../@component/ExpenseCube";

export default function ExpenseCubePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month")?.padStart(2, "0");
  const day = searchParams.get("day")?.padStart(2, "0");

  const hasDate = year && month && day;

  useEffect(() => {
    if (!hasDate) {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = (today.getMonth() + 1).toString().padStart(2, "0");
      const currentDay = today.getDate().toString().padStart(2, "0");

      router.replace(
        `/cube?year=${currentYear}&month=${currentMonth}&day=${currentDay}`
      );
    }
  }, [router, searchParams]);
  return (
    <div className="p-6">
      <h1 className="mb-4 font-bold text-lg">색칠형 예산 시각화</h1>

      {hasDate && <ExpenseCube year={year} month={month} day={day} />}
    </div>
  );
}
