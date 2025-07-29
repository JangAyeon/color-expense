const BudgetSetModal = () => {
  //   const advisedBudget = budgetStatus?.spent
  //     ? Math.ceil((budgetStatus.spent * 1.2) / 10000) * 10000
  //     : 0;
  return (
    <>모달모달</>
    //   <motion.div
    //     initial={{ opacity: 0 }}
    //     animate={{ opacity: 1 }}
    //     exit={{ opacity: 0 }}
    //     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    //     onClick={() => setShowSetBudget(false)}
    //   >
    //     <motion.div
    //       initial={{ scale: 0.9, opacity: 0 }}
    //       animate={{ scale: 1, opacity: 1 }}
    //       exit={{ scale: 0.9, opacity: 0 }}
    //       transition={{ type: "spring", damping: 20, stiffness: 300 }}
    //       className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
    //       onClick={(e) => e.stopPropagation()}
    //     >
    //       <h2 className="text-xl font-semibold mb-4">
    //         {budgetStatus?.year}년 {budgetStatus?.month}월 예산 설정
    //       </h2>

    //       {budgetStatus && budgetStatus.spent > 0 && (
    //         <div className="p-3 bg-gray-50 rounded-lg mb-4">
    //           <p className="text-sm text-gray-700">
    //             현재 지출 금액:{" "}
    //             <span className="font-medium">
    //               {budgetStatus.spent.toLocaleString()}원
    //             </span>
    //           </p>
    //         </div>
    //       )}

    //       <div className="mb-6">
    //         <label className="block text-sm font-medium text-gray-700 mb-1">
    //           예산 금액
    //         </label>
    //         <div className="relative">
    //           <input
    //             type="number"
    //             className="w-full px-3 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blockie-yellow focus:border-blockie-yellow"
    //             placeholder="금액을 입력하세요"
    //             value={newBudget}
    //             onChange={(e) => setNewBudget(e.target.value)}
    //             aria-label="예산 금액 입력"
    //           />
    //           <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
    //             <span className="text-gray-500">원</span>
    //           </div>
    //         </div>
    //       </div>

    //       {/* 예산 제안 */}
    //       {budgetAdvisor && (
    //         <div className="bg-blue-50 rounded-lg p-4 mb-6">
    //           <h3 className="text-sm font-medium text-blue-700 mb-2">
    //             추천 예산 금액
    //           </h3>
    //           <div className="grid grid-cols-3 gap-2">
    //             <Button
    //               variant="outline"
    //               size="sm"
    //               onClick={() => setNewBudget(advisedBudget.toString())}
    //             >
    //               {advisedBudget.toLocaleString()}원
    //             </Button>
    //             <Button
    //               variant="outline"
    //               size="sm"
    //               onClick={() => setNewBudget((advisedBudget * 1.2).toString())}
    //             >
    //               {(advisedBudget * 1.2).toLocaleString()}원
    //             </Button>
    //             <Button
    //               variant="outline"
    //               size="sm"
    //               onClick={() => setNewBudget((advisedBudget * 0.8).toString())}
    //             >
    //               {(advisedBudget * 0.8).toLocaleString()}원
    //             </Button>
    //           </div>
    //           <p className="text-xs text-blue-600 mt-2">
    //             * 현재 지출 패턴 및 일반적인 예산 관리 원칙을 기반으로
    //             제안됩니다.
    //           </p>
    //         </div>
    //       )}

    //       <div className="flex gap-2 justify-end">
    //         <Button
    //           variant="secondary"
    //           onClick={() => {
    //             setShowSetBudget(false);
    //             setBudgetAdvisor(false);
    //           }}
    //         >
    //           취소
    //         </Button>
    //         <Button
    //           variant="primary"
    //           onClick={handleSetBudget}
    //           disabled={!newBudget || parseInt(newBudget, 10) <= 0}
    //         >
    //           저장
    //         </Button>
    //       </div>
    //     </motion.div>
    //   </motion.div>
  );
};

export default BudgetSetModal;
