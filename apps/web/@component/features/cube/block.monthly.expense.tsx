import { ExpenseCategoryItem } from "@type/expense";
import { RecentExpense } from "@type/user";
import { getCategoryColor } from "@utils/common/getCategoryConfig";
import { memo, useMemo } from "react";

interface PartialBlock {
  id: string;
  color: string;
  categoryId: string;
  fill: number; // 0 < fill <= 1
}

const getResidualBlocks = (
  expensesInfo: RecentExpense[],
  getCategoryColor: (category: string) => string
): PartialBlock[] => {
  let residualSum = 0;
  const partialBlocks: PartialBlock[] = [];

  let lastCategory = "기타";

  for (const expense of expensesInfo) {
    const remaining = expense.amount % 10000;
    residualSum += remaining;

    if (remaining > 0) {
      lastCategory = expense.category;
    }

    while (residualSum >= 10000) {
      partialBlocks.push({
        id: `residual-${partialBlocks.length}`,
        color: getCategoryColor(lastCategory),
        categoryId: lastCategory,
        fill: 1,
      });
      residualSum -= 10000;
    }
  }

  // 마지막 자투리 블록 (fill < 1)
  if (residualSum > 0) {
    partialBlocks.push({
      id: `residual-${partialBlocks.length}`,
      color: getCategoryColor("기타"), // 혹은 마지막 category의 색
      categoryId: "기타",
      fill: residualSum / 10000,
    });
  }

  return partialBlocks;
};

// 블록 컬렉션 컴포넌트
const BlockMonthlyExpense = memo<{
  expensesInfo: RecentExpense[];
  categoryInfo: ExpenseCategoryItem[];
  totalBlocks: number;
  maxBlocks: number;
}>(({ totalBlocks, maxBlocks, categoryInfo, expensesInfo }) => {
  const fullBlocks = useMemo(() => {
    return expensesInfo.flatMap((expense) => {
      const fullCount = Math.floor(expense.amount / 10000);
      return Array.from({ length: fullCount }, (_, i) => ({
        id: `${expense.id}-${i}`,
        color: getCategoryColor(expense.category),
        categoryId: expense.category,
        fill: 1, // 100%
      }));
    });
  }, [expensesInfo]);

  const residualBlocks = useMemo(() => {
    return getResidualBlocks(expensesInfo, getCategoryColor);
  }, [expensesInfo]);

  console.log("fullBlocks", fullBlocks);
  console.log("residualBlocks", residualBlocks);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
      {/* <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full -translate-y-16 translate-x-16 blur-2xl" /> */}

      <div className=" z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-gray-800">
            이번 달 블록 컬렉션
          </h2>
          <div className="flex flex-row gap-2">
            {/* 남은 공간 표시 */}
            <div className="text-sm px-3 py-1.5 rounded-full bg-gray-50 text-gray-900 font-medium">
              남은 공간: {maxBlocks - totalBlocks}칸
            </div>
            <div className="text-sm px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 font-medium">
              {totalBlocks}/{maxBlocks} 블록
            </div>
          </div>
        </div>

        <div className="  mb-4 bg-gray-50/50 rounded-xl  border-2 border-dashed border-gray-200">
          {/* 그리드 배경 */}
          <div
            className=" opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* 블록들 */}
          <div className="flex flex-wrap content-start gap-1 overflow-visible">
            {[...fullBlocks, ...residualBlocks].map((block, index) => (
              <div
                key={block.id}
                className="text-black w-8 h-8 rounded-sm shadow-sm relative overflow-hidden transform transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer hover:z-10"
                data-id={index + 1}
              >
                <div
                  className=" h-full"
                  style={{
                    width: `${block.fill * 100}%`,
                    backgroundColor: block.color,
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 범례 */}
        <div className="flex justify-center flex-wrap gap-4">
          {categoryInfo.map(({ category, count }) => (
            <div
              key={category}
              className="flex items-center group cursor-pointer"
            >
              <div
                className="w-3 h-3 rounded-sm mr-2 shadow-sm group-hover:scale-110 transition-transform"
                style={{
                  backgroundColor: getCategoryColor(category),
                }}
              />
              <span className="text-xs text-gray-600 font-medium group-hover:text-gray-800 transition-colors">
                {category} ({count})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

BlockMonthlyExpense.displayName = "BlockExpense";

export default BlockMonthlyExpense;
