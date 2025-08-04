import Image from "next/image";

const EmptyHistoryList = () => {
  return (
    <div className="flex flex-col items-center justify-center h-40 text-neutral-medium-gray">
      <Image
        src="/budget/history/monthCalendar.svg"
        alt="plus icon"
        width={32}
        height={32}
      />

      <p>과거 예산 내역이 없습니다</p>
    </div>
  );
};

export default EmptyHistoryList;
