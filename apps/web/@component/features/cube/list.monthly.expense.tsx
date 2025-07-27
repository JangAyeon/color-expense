import { RecentExpense } from "@type/user";
import {
  getCategoryColor,
  getCategoryIcon,
} from "@utils/common/getCategoryConfig";
import { toYMDWithString } from "@utils/date/YMD";
import { formatWithCurrencySymbol } from "@utils/onboarding/formatter";

const ListMonthlyExpense: React.FC<{
  expensesInfo: RecentExpense[];
}> = ({ expensesInfo }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg text-gray-800">최근 지출</h2>
        <button
          className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          onClick={() => alert("전체 지출 내역 보기")}
        >
          전체보기
        </button>
      </div>

      <div className="space-y-3">
        {expensesInfo.slice(0, 4).map((expense, index) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform"
                style={{
                  backgroundColor: `${getCategoryColor(expense.category)}40`,
                }}
              >
                <span className="text-xl">
                  {getCategoryIcon(expense.category)}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                  {expense.category}
                </div>
                <div className="text-xs text-gray-500 flex items-center">
                  {toYMDWithString(new Date(expense.expenseDate)).formatted}
                  {/* <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                              {expense.category}
                            </span> */}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-800">
                {formatWithCurrencySymbol(expense.amount)}
              </div>
              <div className="text-xs text-gray-400">
                {Math.ceil(expense.amount / 10000)} 블록
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
      <button
        onClick={() => alert("더 많은 지출 내역 보기")}
        className="w-full p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200"
      >
        <span className="text-sm font-medium">더 많은 지출 내역 보기</span>
      </button>
    </div>
  );
};

export default ListMonthlyExpense;
