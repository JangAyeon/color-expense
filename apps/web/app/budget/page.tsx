"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BudgetManager from "../../@component/BudgetManager";

export default function BudgetPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    if (!year || !month) {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;

      // 쿼리 스트링 붙여서 주소 변경 (replace: 히스토리 쌓이지 않음)
      router.replace(`/budget?year=${currentYear}&month=${currentMonth}`);
    }
  }, [router, searchParams]);

  return <BudgetManager />;
}
