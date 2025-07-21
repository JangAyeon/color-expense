// import UserProfile from "../../@component/UserProfile";

// export default async function MyPage() {
//   return <UserProfile />;
// }

// BlockieMyPage.tsx

"use client";
import { BlockieFace, BlockieBottom } from "@repo/ui";
import React, { useState, useEffect } from "react";

// 타입 정의

type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt?: string;
};

type BudgetMonth = {
  year: number;
  month: number;
  spent: number;
  budget: number;
  usagePercentage: number;
  status: "success" | "warning" | "danger";
};

type BudgetHistory = {
  history: BudgetMonth[];
  averageMonthlySpending: number;
  budgetComplianceRate: number;
};

type Expense = {
  id: string;
  amount: number;
  category: string;
  expenseDate: string;
};

// Mock API
const mockAPI = {
  async fetchUserProfile(): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      id: "user_123",
      name: "홍길동",
      email: "hong@blockie.app",
      phone: "010-1234-5678",
      createdAt: "2024-01-15T00:00:00Z",
    };
  },

  async updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { ...data, updatedAt: new Date().toISOString() } as UserProfile;
  },

  async fetchBudgetHistory(): Promise<BudgetHistory> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      history: [
        {
          year: 2024,
          month: 12,
          spent: 850000,
          budget: 1000000,
          usagePercentage: 85,
          status: "success",
        },
        {
          year: 2024,
          month: 11,
          spent: 1200000,
          budget: 1000000,
          usagePercentage: 120,
          status: "danger",
        },
        {
          year: 2024,
          month: 10,
          spent: 950000,
          budget: 1000000,
          usagePercentage: 95,
          status: "warning",
        },
        {
          year: 2024,
          month: 9,
          spent: 750000,
          budget: 1000000,
          usagePercentage: 75,
          status: "success",
        },
      ],
      averageMonthlySpending: 937500,
      budgetComplianceRate: 75.0,
    };
  },

  async fetchRecentExpenses(): Promise<Expense[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      {
        id: "1",
        amount: 25000,
        category: "식비",
        expenseDate: "2024-12-20T18:30:00Z",
      },
      {
        id: "2",
        amount: 50000,
        category: "교통비",
        expenseDate: "2024-12-19T09:15:00Z",
      },
      {
        id: "3",
        amount: 15000,
        category: "카페",
        expenseDate: "2024-12-18T14:20:00Z",
      },
      {
        id: "4",
        amount: 120000,
        category: "쇼핑",
        expenseDate: "2024-12-17T16:45:00Z",
      },
    ];
  },
};

export default function BlockieMyPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [budgetHistory, setBudgetHistory] = useState<BudgetHistory | null>(
    null
  );
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<
    Pick<UserProfile, "name" | "email" | "phone">
  >({
    name: "",
    email: "",
    phone: "",
  });
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [userProfile, budgetData, expenseData] = await Promise.all([
          mockAPI.fetchUserProfile(),
          mockAPI.fetchBudgetHistory(),
          mockAPI.fetchRecentExpenses(),
        ]);

        setUser(userProfile);
        setBudgetHistory(budgetData);
        setRecentExpenses(expenseData);
        setFormData({
          name: userProfile.name,
          email: userProfile.email,
          phone: userProfile.phone,
        });
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      const updatedUser = await mockAPI.updateUserProfile(formData);
      setUser(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
    } finally {
      setUpdating(false);
    }
  };

  const getUserEmotion = (): "happy" | "neutral" | "sad" => {
    if (!budgetHistory || !budgetHistory.history.length) return "neutral";
    const latestMonth = budgetHistory.history[0];
    if (latestMonth?.status === "danger") return "sad";
    if (latestMonth?.status === "warning") return "neutral";
    return "happy";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center items-center justify-center flex flex-col">
          <div className="animate-pulse">
            <BlockieFace size={120} emotion="neutral" />
            <BlockieBottom size={120} />
          </div>
          <p className="mt-4 text-gray-600">
            블록키가 정보를 가져오고 있어요...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 w-full">
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero Section with Blockie Character */}
        <section className="relative bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl p-8 mb-8 shadow-xl border border-white/60 backdrop-blur-sm overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full opacity-30 blur-lg"></div>

          <div className="relative flex flex-col items-center gap-4">
            {/* Blockie Character Section */}
            <div className="">
              <div className="flex flex-col items-center">
                {/* Floating Animation Container */}
                <div className="relative transform transition-all duration-500 hover:scale-110 hover:-rotate-3">
                  <div className="animate-bounce">
                    <BlockieFace size={140} emotion={getUserEmotion()} />
                    <BlockieBottom size={140} />
                  </div>
                  {/* Cute Speech Bubble */}
                  {budgetHistory?.budgetComplianceRate && (
                    <div className="absolute -right-8 -top-4 bg-white rounded-2xl p-3 shadow-lg border border-gray-100">
                      <div className="text-lg">
                        {budgetHistory?.budgetComplianceRate >= 80
                          ? "😊"
                          : budgetHistory?.budgetComplianceRate >= 60
                            ? "😌"
                            : "💪"}
                      </div>
                      <div className="absolute left-2 bottom-0 w-3 h-3 bg-white border-l border-b border-gray-100 transform rotate-45 translate-y-1/2"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Sparkles */}
              <div className="absolute -top-2 -left-2 w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 -right-4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce"></div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-4">
                <h2 className="text-center text-4xl lg:text-5xl font-black mb-3">
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 bg-clip-text text-transparent">
                    안녕하세요,
                  </span>

                  <span className="text-gray-800">{user?.name}님!</span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 items-center justify-center">
                {budgetHistory?.budgetComplianceRate && (
                  <p className="text-xl text-gray-600 mb-6 text-center leading-relaxed">
                    {budgetHistory?.budgetComplianceRate >= 80
                      ? "🎉 완벽한 지출 관리의 달인이시네요!"
                      : budgetHistory?.budgetComplianceRate >= 60
                        ? "✨ 꾸준한 관리로 습관을 만들어가고 있어요!"
                        : "🚀 함께 똑똑한 지출 습관을 만들어 봐요!"}
                  </p>
                )}
              </div>

              {/* Stats Pills */}
              <div className="flex flex-wrap gap-3  lg:justify-start mb-6">
                <div className="group relative">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-5 py-3 rounded-2xl font-semibold text-sm shadow-lg transform transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
                    🎯 예산 준수율 {budgetHistory?.budgetComplianceRate}%
                  </div>
                </div>

                <div className="group relative">
                  <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-5 py-3 rounded-2xl font-semibold text-sm shadow-lg transform transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
                    📅{" "}
                    {user?.createdAt && new Date(user?.createdAt).getFullYear()}
                    년부터 함께
                  </div>
                </div>

                <div className="group relative">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-5 py-3 rounded-2xl font-semibold text-sm shadow-lg transform transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
                    ⭐ {recentExpenses.length}개 최근 기록
                  </div>
                </div>
              </div>

              {/* Achievement Badge */}
              {budgetHistory?.budgetComplianceRate &&
                budgetHistory?.budgetComplianceRate >= 80 && (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-300 rounded-2xl px-4 py-2 animate-pulse">
                    <span className="text-2xl">🏆</span>
                    <span className="text-sm font-bold text-yellow-700">
                      지출 관리 마스터
                    </span>
                  </div>
                )}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8">
          {/* Profile Section */}
          <section className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-8 shadow-xl border border-white/60 backdrop-blur-sm mb-8 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-30 blur-lg"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-yellow-200 to-orange-200 rounded-full opacity-20 blur-md"></div>

              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl">👤</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-800">
                        프로필 정보
                      </h3>
                      <p className="text-sm text-gray-500 font-medium">
                        나의 소중한 정보들
                      </p>
                    </div>
                  </div>

                  {!editMode && (
                    <button
                      onClick={() => setEditMode(true)}
                      className="group relative bg-gradient-to-r from-yellow-300 to-orange-300 hover:from-yellow-400 hover:to-orange-400 text-gray-800 px-6 py-3 rounded-2xl font-bold text-sm shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-lg">✏️</span>
                        수정하기
                      </span>
                    </button>
                  )}
                </div>

                {editMode ? (
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                        <span className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs">👤</span>
                        </span>
                        이름
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-200 text-lg font-medium group-hover:border-gray-300"
                        placeholder="멋진 이름을 입력해주세요"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                        <span className="w-5 h-5 bg-green-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs">📧</span>
                        </span>
                        이메일
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-200 text-lg font-medium group-hover:border-gray-300"
                        placeholder="blockie@example.com"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                        <span className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs">📱</span>
                        </span>
                        전화번호
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-200 text-lg font-medium group-hover:border-gray-300"
                        placeholder="010-0000-0000"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleUpdateProfile}
                        disabled={updating}
                        className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center justify-center gap-2">
                          {updating ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              저장 중...
                            </>
                          ) : (
                            <>
                              <span className="text-xl">💾</span>
                              저장하기
                            </>
                          )}
                        </span>
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-4 rounded-2xl font-bold text-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-xl">❌</span>
                          취소
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {/* Name */}
                    <div className="group bg-white/70 hover:bg-white rounded-2xl p-5 transition-all duration-200 hover:shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <span className="text-lg">👤</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">
                              이름
                            </span>
                            <div className="font-bold text-lg text-gray-800">
                              {user?.name}
                            </div>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="group bg-white/70 hover:bg-white rounded-2xl p-5 transition-all duration-200 hover:shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <span className="text-lg">📧</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">
                              이메일
                            </span>
                            <div className="font-bold text-lg text-gray-800">
                              {user?.email}
                            </div>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="group bg-white/70 hover:bg-white rounded-2xl p-5 transition-all duration-200 hover:shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <span className="text-lg">📱</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">
                              전화번호
                            </span>
                            <div className="font-bold text-lg text-gray-800">
                              {user?.phone}
                            </div>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>

                    {/* Join Date */}
                    <div className="group bg-white/70 hover:bg-white rounded-2xl p-5 transition-all duration-200 hover:shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <span className="text-lg">📅</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">
                              가입일
                            </span>
                            <div className="font-bold text-lg text-gray-800">
                              {user?.createdAt &&
                                new Date(user?.createdAt).toLocaleDateString(
                                  "ko-KR"
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
