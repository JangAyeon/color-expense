import { isCurrentOrFutureMonth } from "@utils/budget";
import Image from "next/image";

interface EmptyBudgetStateProps {
  year: number;
  month: number;
}

const EmptyBudgetState = ({ year, month }: EmptyBudgetStateProps) => {
  return (
    <div className="flex items-center justify-center py-8 text-neutral-medium-gray">
      <div className="text-center flex flex-col items-center gap-2">
        <Image
          src="/budget/history/plus.svg"
          alt="plus icon"
          width={32}
          height={32}
        />
        <div>
          <p className="text-body-2">이 달은 예산이 설정되지 않았습니다</p>
          {isCurrentOrFutureMonth(year, month) && (
            <button className="cursor-pointer mt-2 text-caption text-neutral-medium-gray hover:text-info underline">
              예산 설정하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyBudgetState;
