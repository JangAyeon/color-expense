interface TabMenuProps {
  changeTab: (tab: string) => void;
  activeTab: string;
}

const TabMenu: React.FC<TabMenuProps> = ({ changeTab, activeTab }) => {
  return (
    <div className="flex justify-center mb-8 relative">
      <nav className="bg-white shadow-md rounded-full px-1 py-1 inline-flex">
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "current" ? "bg-blockie-yellow text-neutral-black" : "text-gray-500 hover:bg-gray-100"}`}
          onClick={() => changeTab("current")}
          aria-label="이번 달 예산 탭"
        >
          이번 달 예산
        </button>
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "history" ? "bg-blockie-yellow text-neutral-black" : "text-gray-500 hover:bg-gray-100"}`}
          onClick={() => changeTab("history")}
          aria-label="예산 내역 탭"
        >
          예산 내역
        </button>
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "insights" ? "bg-blockie-yellow text-neutral-black" : "text-gray-500 hover:bg-gray-100"}`}
          onClick={() => changeTab("insights")}
          aria-label="예산 분석 탭"
        >
          예산 분석
        </button>
      </nav>
    </div>
  );
};

export default TabMenu;
