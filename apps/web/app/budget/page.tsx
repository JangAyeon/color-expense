"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { Button, BlockieFace, BlockieBottom } from "@repo/ui";
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
import { Doughnut, Bar, Line, Radar } from "react-chartjs-2";
import { Emotion } from "@type/onboarding";
import useBudgetTab from "@hook/business/budget/useBudgetTab";

import useAnimatedFrame from "@hook/business/budget/useAnimationFrame";
// import { BudgetStatus, BudgetHistory } from "@type/budget";
import { ExpenseCategory } from "@type/expense";
import {
  BarOptionsAnimation,
  BudgetPageVariants,
  DoughnutOptionsAnimation,
} from "@constant/budget";
import { getExpenseStateWithBudget, getMonthName } from "@utils/budget";
import { useRouter, useSearchParams } from "next/navigation";
import { toYMDWithString } from "@utils/date/YMD";
import Card from "@component/budget/card";
import HistoryTab from "@component/budget/historyTab";
import { BudgetStatus } from "@type/budget";
import TabMenu from "@component/budget/tabMenu";
import CurrentBudget from "@component/budget/currentBudget";
import Insight from "@component/budget/insight";
import BudgetSetModal from "@component/budget/budgetSetModal";

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

// 커스텀 훅: 지출 통계 계산
// function getExpenseStateWithBudget(spent: number, budget: number) {
//   if (budget === 0) {
//     return {
//       usageRate: 0,
//       usageRateDisplay: 0,
//       isOverBudget: false,
//       isNearLimit: false,
//       emotion: "neutral",
//       status: "미설정",
//       statusColor: "text-yellow-500",
//       barColor: "#9CA3AF",
//     };
//   }

//   const usageRate = (spent / budget) * 100;
//   const usageRateDisplay = usageRate > 100 ? 100 : usageRate;
//   const isOverBudget = spent > budget;
//   const isNearLimit = usageRate > 80 && usageRate <= 100;

//   let emotion = "happy";
//   let status = "여유";
//   let statusColor = "text-green-500";
//   let barColor = "#8DDBA4"; // blockie-green

//   if (isOverBudget) {
//     emotion = "sad";
//     status = "초과";
//     statusColor = "text-red-500";
//     barColor = "#F47D7D"; // blockie-red
//   } else if (isNearLimit) {
//     emotion = "neutral";
//     status = "주의";
//     statusColor = "text-yellow-500";
//     barColor = "#FBBF24"; // warning color
//   }

//   return {
//     usageRate,
//     usageRateDisplay,
//     isOverBudget,
//     isNearLimit,
//     emotion,
//     status,
//     statusColor,
//     barColor,
//   };
// }

// 커스텀 훅: 탭 변경 애니메이션
// function useBudgetTab() {
//   const [activeTab, setActiveTab] = useState("current");
//   const [direction, setDirection] = useState(0);

//   const changeTab = (tab: string) => {
//     const tabOrder = { current: 0, history: 1, insights: 2 };
//     setDirection(
//       tabOrder[tab as keyof typeof tabOrder] -
//         tabOrder[activeTab as keyof typeof tabOrder]
//     );
//     setActiveTab(tab);
//   };

//   return { activeTab, changeTab, direction };
// }

// 커스텀 훅: 애니메이션이 있는 카운터
// function useAnimatedFrame(targetValue: number, duration: number = 1000) {
//   const [displayValue, setDisplayValue] = useState(0);
//   const startTimeRef = useRef<number | null>(null);
//   const startValueRef = useRef(0);
//   const requestRef = useRef<number>(0);

//   useEffect(() => {
//     startValueRef.current = displayValue;
//     startTimeRef.current = null;

//     const animate = (timestamp: number) => {
//       if (startTimeRef.current === null) {
//         startTimeRef.current = timestamp;
//       }

//       const elapsed = timestamp - startTimeRef.current;
//       const progress = Math.min(elapsed / duration, 1);

//       const newValue = Math.floor(
//         startValueRef.current + (targetValue - startValueRef.current) * progress
//       );
//       setDisplayValue(newValue);

//       if (progress < 1) {
//         requestRef.current = requestAnimationFrame(animate);
//       }
//     };

//     requestRef.current = requestAnimationFrame(animate);

//     return () => {
//       if (requestRef.current !== undefined) {
//         cancelAnimationFrame(requestRef.current);
//       }
//     };
//   }, [targetValue, duration]);

//   return displayValue;
// }

// // 예산 상태 타입 정의
// type BudgetStatus = {
//   year: number;
//   month: number;
//   hasBudget: boolean;
//   budget: number;
//   spent: number;
//   remaining: number;
// };

// // 월별 예산 내역 타입 정의
// type BudgetHistory = {
//   year: number;
//   month: number;
//   budget: number;
//   spent: number;
//   remaining: number;
// };

// 지출 카테고리 타입 정의
// type ExpenseCategory = {
//   name: string;
//   amount: number;
//   color: string;
// };

// interface Achievement {
//   title: string;
//   description: string;
//   earned: boolean;
//   icon: string;
//   date?: string;
//   progress?: number;
// }

// Mock 데이터 - 예산이 설정되지 않은 상태로 시작
// const MOCK_CURRENT_BUDGET: BudgetStatus = {
//   year: 2025,
//   month: 7, // 7월
//   hasBudget: true, // 예산이 설정되지 않음
//   budget: 0,
//   spent: 320000, // 지출은 있음
//   remaining: -320000,
// };

// Mock 지출 카테고리 데이터
const MOCK_EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { name: "식비", amount: 150000, color: "#F4DF7D" }, // blockie-yellow
  { name: "교통비", amount: 50000, color: "#8DDBA4" }, // blockie-green
  { name: "쇼핑", amount: 80000, color: "#7DC0F4" }, // blockie-blue
  { name: "여가", amount: 30000, color: "#C89DF4" }, // blockie-purple
  { name: "주거", amount: 10000, color: "#F48DAE" }, // blockie-pink
];

// 애니메이션 배리언트

// 컴포넌트: 카드
// const Card = ({
//   children,
//   className = "",
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => (
//   <motion.div
//     className={`bg-white rounded-lg shadow-lg p-6 ${className}`}
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.3 }}
//   >
//     {children}
//   </motion.div>
// );

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

  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
    []
  );
  const [showSetBudget, setShowSetBudget] = useState(false);
  const [newBudget, setNewBudget] = useState("");
  const [budgetAdvisor, setBudgetAdvisor] = useState(false);

  // 현재 년월 구하기
  // const now = new Date();
  // const currentYear = now.getFullYear();
  // const currentMonth = now.getMonth() + 1;

  // Mock 예산 정보 불러오기
  useEffect(() => {
    // API 호출을 시뮬레이션하기 위한 타임아웃
    const timer = setTimeout(() => {
      // setBudgetStatus(MOCK_CURRENT_BUDGET);
      setExpenseCategories(MOCK_EXPENSE_CATEGORIES);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!hasDate) {
      const today = new Date();
      const { year, month, day } = toYMDWithString(today);
      router.replace(`/budget?year=${year}&month=${month}&day=${day}`);
    }
  }, [router, searchParams, hasDate]);
  // Mock 예산 내역 불러오기
  // useEffect(() => {
  //   if (activeTab !== "history") return;

  //   // API 호출을 시뮬레이션하기 위한 타임아웃
  //   const timer = setTimeout(() => {
  //     setBudgetHistory(MOCK_BUDGET_HISTORY);
  //   }, 800);

  //   return () => clearTimeout(timer);
  // }, [activeTab]);

  // Mock 예산 설정하기
  const handleSetBudget = async () => {
    // 로딩 상태 시뮬레이션
    setLoading(true);

    setTimeout(() => {
      // 새 예산 설정
      // const budget = parseInt(newBudget, 10);
      // const updatedBudget = {
      //   hasBudget: true, // 예산이 설정됨
      //   budget: budget,
      //   remaining: budget - MOCK_CURRENT_BUDGET.spent,
      // };

      // setBudgetStatus(updatedBudget);
      setShowSetBudget(false);
      setNewBudget("");
      setLoading(false);
    }, 800);
  };

  // 예산 통계 계산
  // const stats = budgetStatus
  //   ? getExpenseStateWithBudget(budgetStatus.spent, budgetStatus.budget)
  //   : {
  //       usageRate: 0,
  //       usageRateDisplay: 0,
  //       emotion: "neutral",
  //       status: "",
  //       isOverBudget: true,
  //       isNearLimit: false,
  //       statusColor: "",
  //       barColor: "#9CA3AF",
  //     };

  // // 애니메이션이 있는 카운터
  // const animatedBudget = useAnimatedFrame(budgetStatus?.budget || 0);
  // const animatedSpent = useAnimatedFrame(budgetStatus?.spent || 0);
  // const animatedRemaining = useAnimatedFrame(budgetStatus?.remaining || 0);

  // 차트 데이터 - 도넛 차트 (지출 카테고리)
  // const doughnutData = {
  //   labels: expenseCategories.map((cat) => cat.name),
  //   datasets: [
  //     {
  //       data: expenseCategories.map((cat) => cat.amount),
  //       backgroundColor: expenseCategories.map((cat) => cat.color),
  //       borderColor: expenseCategories.map(() => "#ffffff"),
  //       borderWidth: 2,
  //       hoverOffset: 4,
  //     },
  //   ],
  // };

  // 차트 데이터 - 바 차트 (예산 내역)

  // 차트 옵션

  // 예산 어드바이저
  // const advisedBudget = budgetStatus?.spent
  //   ? Math.ceil((budgetStatus.spent * 1.2) / 10000) * 10000
  //   : 0;

  // 월 이름 가져오기
  // const getMonthName = (month: number) => {
  //   const monthNames = [
  //     "1월",
  //     "2월",
  //     "3월",
  //     "4월",
  //     "5월",
  //     "6월",
  //     "7월",
  //     "8월",
  //     "9월",
  //     "10월",
  //     "11월",
  //     "12월",
  //   ];
  //   return monthNames[month - 1];
  // };

  if (loading || !hasDate) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <BlockieFace size={60} emotion="neutral" />
          <BlockieBottom size={60} />
        </div>
        <p className="mt-4 text-gray-600 animate-pulse">
          예산 정보를 불러오는 중...
        </p>
      </div>
    );
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

        {activeTab === "current" && (
          <CurrentBudget
            direction={direction}
            setShowSetBudget={setShowSetBudget}
            setBudgetAdvisor={setBudgetAdvisor}
            year={year}
            month={month}
          />
        )}
        {/* 예산 내역 탭 */}
        {activeTab === "history" && <HistoryTab />}
        {/* 지출 분석 탭 */}
        {activeTab === "insights" && <Insight />}
      </AnimatePresence>

      {/* 예산 설정 모달 */}
      <AnimatePresence>{showSetBudget && <BudgetSetModal />}</AnimatePresence>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>효율적인 예산 관리로 건강한 재정 상태를 유지하세요.</p>
        <p className="mt-1">© 2025 Blockie - 모든 권리 보유</p>
      </footer>
    </div>
  );
}
