import Image from "next/image";

const EmptyMonthListed = () => {
  return (
    <div className="h-80 mb-6 flex items-center justify-center bg-gray-50 rounded-lg">
      <div className="text-center flex-col flex items-center gap-2 text-neutral-black">
        <Image
          src="/common/noMonthListed.svg"
          alt="plus icon"
          width={32}
          height={32}
        />
        <p>예산이 설정된 달이 없습니다</p>
      </div>
    </div>
  );
};

export default EmptyMonthListed;
