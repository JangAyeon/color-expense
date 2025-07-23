"use client";

import { useMyPage } from "@hook/api/user/useMyPage";
import { useUserEmotion } from "@hook/mypage/useUserEmotion";
import { useProfileForm } from "@hook/mypage/useUserProfileForm";
import { BlockieFace, BlockieBottom } from "@repo/ui";

import { RecentExpense, User, BudgetHistoryResponse } from "@type/user";

// 로딩 컴포넌트
const MyPageLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-pulse">
        <BlockieFace size={120} emotion="neutral" />
        <BlockieBottom size={120} />
      </div>
      <p className="mt-4 text-gray-600">블록키가 정보를 가져오고 있어요...</p>
    </div>
  </div>
);

// 에러 컴포넌트
const MyPageError = ({ errors }: { errors: any }) => (
  <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
    <div className="text-center p-8 bg-white rounded-lg shadow-lg">
      <BlockieFace size={80} emotion="sad" />
      <BlockieBottom size={80} />
      <h2 className="text-xl font-bold text-red-600 mt-4">
        오류가 발생했습니다
      </h2>
      <p className="text-gray-600 mt-2">페이지를 새로고침해 주세요.</p>
      {process.env.NODE_ENV === "development" && (
        <details className="mt-4 text-left">
          <summary className="cursor-pointer text-red-500">에러 상세</summary>
          <pre className="text-xs mt-2 bg-gray-100 p-2 rounded">
            {JSON.stringify(errors, null, 2)}
          </pre>
        </details>
      )}
    </div>
  </div>
);

// 히어로 섹션 컴포넌트
const HeroSection = ({
  user,
  budgetHistory,
  recentExpenses,
  emotion,
}: {
  user: User;
  budgetHistory: BudgetHistoryResponse;
  recentExpenses: RecentExpense[];
  emotion: "happy" | "neutral" | "sad";
}) => {
  console.log("#@##", user, budgetHistory, recentExpenses);

  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl p-8 mb-8 shadow-xl border border-white/60 backdrop-blur-sm overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full opacity-30 blur-lg"></div>

      <div className="relative flex flex-col items-center gap-4">
        {/* 캐릭터 섹션 */}
        <div className="relative transform transition-all duration-500 hover:scale-110 hover:-rotate-3">
          <div className="animate-bounce">
            <BlockieFace size={140} emotion={emotion} />
            <BlockieBottom size={140} />
          </div>

          {/* 말풍선 */}
          {budgetHistory?.budgetComplianceRate && (
            <div className="absolute -right-8 -top-4 bg-white rounded-2xl p-3 shadow-lg border border-gray-100">
              <div className="text-lg">
                {budgetHistory.budgetComplianceRate >= 80
                  ? "😊"
                  : budgetHistory.budgetComplianceRate >= 60
                    ? "😌"
                    : "💪"}
              </div>
            </div>
          )}
        </div>

        {/* 텍스트 섹션 */}
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-black mb-3">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 bg-clip-text text-transparent">
              안녕하세요,
            </span>
            <span className="text-gray-800">{user?.name || "사용자"}님!</span>
          </h2>

          {budgetHistory?.budgetComplianceRate && (
            <p className="text-xl text-gray-600 mb-6 text-center leading-relaxed">
              {budgetHistory.budgetComplianceRate >= 80
                ? "🎉 완벽한 지출 관리의 달인이시네요!"
                : budgetHistory.budgetComplianceRate >= 60
                  ? "✨ 꾸준한 관리로 습관을 만들어가고 있어요!"
                  : "🚀 함께 똑똑한 지출 습관을 만들어 봐요!"}
            </p>
          )}

          {/* 통계 배지들 */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {budgetHistory?.budgetComplianceRate && (
              <div className="group relative">
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-5 py-3 rounded-2xl font-semibold text-sm shadow-lg transform transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
                  🎯 예산 준수율 {budgetHistory.budgetComplianceRate.toFixed(1)}
                  %
                </div>
              </div>
            )}

            <div className="group relative">
              <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-5 py-3 rounded-2xl font-semibold text-sm shadow-lg transform transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
                📅 {user?.createdAt && new Date(user.createdAt).getFullYear()}
                년부터 함께
              </div>
            </div>

            <div className="group relative">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-5 py-3 rounded-2xl font-semibold text-sm shadow-lg transform transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
                ⭐ {recentExpenses.length}개 최근 기록
              </div>
            </div>
          </div>

          {/* 성취 배지 */}
          {budgetHistory?.budgetComplianceRate >= 80 && (
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
  );
};

// 프로필 폼 컴포넌트
const ProfileForm = ({ user }: { user: User }) => {
  const form = useProfileForm({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
  });

  return (
    <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-8 shadow-xl border border-white/60 backdrop-blur-sm mb-8 relative overflow-hidden">
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-800">프로필 정보</h3>
              <p className="text-sm text-gray-500 font-medium">
                나의 소중한 정보들
              </p>
            </div>
          </div>

          {!form.editMode && (
            <button
              onClick={form.startEditing}
              className="group relative bg-gradient-to-r from-yellow-300 to-orange-300 hover:from-yellow-400 hover:to-orange-400 text-gray-800 px-6 py-3 rounded-2xl font-bold text-sm shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">✏️</span>
                수정하기
              </span>
            </button>
          )}
        </div>

        {form.editMode ? (
          <div className="space-y-6">
            {/* 편집 폼 */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </span>
                이름
              </label>
              <input
                type="text"
                value={form.formData.name || ""}
                onChange={(e) => form.updateField("name", e.target.value)}
                className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-200 text-lg font-medium"
                placeholder="이름을 입력해주세요"
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
                value={form.formData.email || ""}
                onChange={(e) => form.updateField("email", e.target.value)}
                className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-200 text-lg font-medium"
                placeholder="이메일을 입력해주세요"
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
                value={form.formData.phone || ""}
                onChange={(e) => form.updateField("phone", e.target.value)}
                className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-200 text-lg font-medium"
                placeholder="전화번호를 입력해주세요"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={form.handleSubmit}
                disabled={form.isSubmitting || !form.hasChanges}
                className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="flex items-center justify-center gap-2">
                  {form.isSubmitting ? (
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
                onClick={form.handleCancel}
                disabled={form.isSubmitting}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-4 rounded-2xl font-bold text-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50"
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
            {/* 읽기 전용 프로필 정보 */}
            {[
              {
                label: "이름",
                value: user?.name,
                icon: "👤",
                bgColor: "bg-blue-100",
              },
              {
                label: "이메일",
                value: user?.email,
                icon: "📧",
                bgColor: "bg-green-100",
              },
              {
                label: "전화번호",
                value: user?.phone,
                icon: "📱",
                bgColor: "bg-purple-100",
              },
              {
                label: "가입일",
                value: user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("ko-KR")
                  : "",
                icon: "📅",
                bgColor: "bg-yellow-100",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white/70 hover:bg-white rounded-2xl p-5 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 ${item.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        {item.label}
                      </span>
                      <div className="font-bold text-lg text-gray-800">
                        {item.value || "-"}
                      </div>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 메인 컴포넌트
export default function MyPage() {
  const {
    profile,
    budgetHistory,
    recentExpenses,
    isLoading,
    hasError,
    errors,
    isSuccess,
  } = useMyPage();
  const emotion = useUserEmotion(budgetHistory.data);

  if (isLoading) return <MyPageLoading />;
  if (hasError || !isSuccess) return <MyPageError errors={errors} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 w-full">
      <main className="max-w-5xl mx-auto px-4 py-8">
        <HeroSection
          user={profile.data!}
          budgetHistory={budgetHistory.data!}
          recentExpenses={recentExpenses.data || []}
          emotion={emotion}
        />

        <ProfileForm user={profile.data!} />
      </main>
    </div>
  );
}
