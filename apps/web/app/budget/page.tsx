"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  PolarAreaController,
  RadialLinearScale,
} from "chart.js";

import useBudgetTab from "@hook/business/budget/useBudgetTab";

import { useRouter, useSearchParams } from "next/navigation";
import { toYMDWithString } from "@utils/date/YMD";

import HistorySection from "@component/budget/history/historySection";

import TabMenu from "@component/budget/tabMenu";
import CurrentBudget from "@component/budget/currentBudget";
import Insight from "@component/budget/insight";
import BudgetSetModal from "@component/budget/budgetSetModal";
import { pageUrl } from "@constant/page.route";
import FullLoader from "@component/budget/loading/FullLoader";
import { useUpdateBudget } from "@hook/api/budget/useBudget";
import { BUDGET_TAB_MENU } from "@constant/budget";

// Chart.js 등록
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  BarElement,
  PolarAreaController,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title
);

export default function BudgetPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month")?.padStart(2, "0");
  const day = searchParams.get("day")?.padStart(2, "0");
  const hasDate = year && month && day;
  const [loading, setLoading] = useState(true);
  const { activeTab, changeTab, direction } = useBudgetTab();
  // const [budgetStatus, setBudgetStatus] = useState<BudgetStatus | null>(null);
  const mutateBudget = useUpdateBudget(
    hasDate
      ? { year: Number(year), month: Number(month) }
      : { year: 0, month: 0 }
  );

  const [showSetBudget, setShowSetBudget] = useState(false);
  const [newBudget, setNewBudget] = useState("");
  const [budgetAdvisor, setBudgetAdvisor] = useState(false);

  useEffect(() => {
    if (!hasDate) {
      const today = new Date();
      const { year, month, day } = toYMDWithString(today);
      router.replace(
        `${pageUrl.budget}?year=${year}&month=${month}&day=${day}`
      );
    }
  }, [router, searchParams, hasDate]);

  const handleSetBudget = async () => {
    // 로딩 상태 시뮬레이션
    if (!hasDate || !newBudget) return;
    setLoading(true);
    mutateBudget.mutate({
      year: Number(year),
      month: Number(month),
      amount: Number(newBudget),
    });
    setTimeout(() => {
      setShowSetBudget(false);
      setNewBudget("");
      setLoading(false);
    }, 800);
  };

  if (loading || !hasDate) {
    <FullLoader />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-center">예산 관리</h1>
        <p className="text-center text-gray-500 mt-2">
          스마트한 예산 관리로 현명한 소비 습관을 만들어 보세요
        </p>
      </motion.div>

      {/* 탭 메뉴 */}
      <TabMenu changeTab={changeTab} activeTab={activeTab} />

      <AnimatePresence mode="wait" custom={direction}>
        {/* 현재 예산 탭 */}

        {activeTab === BUDGET_TAB_MENU.CURRENT && hasDate && (
          <CurrentBudget
            direction={direction}
            setShowSetBudget={setShowSetBudget}
            setBudgetAdvisor={setBudgetAdvisor}
            year={year}
            month={month}
          />
        )}
        {/* 예산 내역 탭 */}
        {activeTab === BUDGET_TAB_MENU.HISTORY && <HistorySection />}
        {/* 지출 분석 탭 */}
        {activeTab === BUDGET_TAB_MENU.INSIGHTS && hasDate && (
          <Insight
            direction={direction}
            setNewBudget={setNewBudget}
            setShowSetBudget={setShowSetBudget}
            year={year}
            month={month}
          />
        )}
      </AnimatePresence>

      {/* 예산 설정 모달 */}
      <AnimatePresence>
        {showSetBudget && hasDate && (
          <BudgetSetModal
            year={year}
            month={month}
            newBudget={newBudget}
            budgetAdvisor={budgetAdvisor}
            setNewBudget={setNewBudget}
            setShowSetBudget={setShowSetBudget}
            setBudgetAdvisor={setBudgetAdvisor}
            handleSetBudget={handleSetBudget}
          />
        )}
      </AnimatePresence>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>효율적인 예산 관리로 건강한 재정 상태를 유지하세요.</p>
        <p className="mt-1">© 2025 Blockie - 모든 권리 보유</p>
      </footer>
    </div>
  );
}
