const Insight = () => {
  return (
    <></>
    //   <motion.div
    //     key="insights"
    //     custom={direction}
    //     variants={BudgetPageVariants}
    //     initial="initial"
    //     animate="animate"
    //     exit="exit"
    //     className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    //   >
    //     <Card>
    //       <h3 className="text-lg font-medium mb-4">지출 추세 분석</h3>
    //       <div className="h-64 mb-4">
    //         <Line
    //           data={{
    //             labels: budgetHistory
    //               .map((item) => `${item.month}월`)
    //               .reverse(),
    //             datasets: [
    //               {
    //                 label: "월별 지출 추이",
    //                 data: budgetHistory.map((item) => item.spent).reverse(),
    //                 borderColor: "#7DC0F4", // blockie-blue
    //                 backgroundColor: "rgba(125, 192, 244, 0.1)",
    //                 tension: 0.3,
    //                 fill: true,
    //               },
    //             ],
    //           }}
    //           options={{
    //             plugins: {
    //               legend: {
    //                 display: false,
    //               },
    //             },
    //             scales: {
    //               x: {
    //                 grid: {
    //                   display: false,
    //                 },
    //               },
    //               y: {
    //                 grid: {
    //                   color: "rgba(0, 0, 0, 0.05)",
    //                 },
    //                 ticks: {
    //                   callback: function (value) {
    //                     return value.toLocaleString() + "원";
    //                   },
    //                 },
    //               },
    //             },
    //             maintainAspectRatio: false,
    //           }}
    //         />
    //       </div>

    //       {budgetHistory.length > 0 ? (
    //         <div className="space-y-4">
    //           <div className="grid grid-cols-2 gap-4">
    //             <div className="bg-blue-50 rounded-lg p-4">
    //               <p className="text-sm text-blue-700 mb-1">평균 월 지출</p>
    //               <p className="text-xl font-bold">
    //                 {(
    //                   budgetHistory.reduce((acc, item) => acc + item.spent, 0) /
    //                   budgetHistory.length
    //                 ).toLocaleString()}
    //                 원
    //               </p>
    //             </div>
    //             <div className="bg-purple-50 rounded-lg p-4">
    //               <p className="text-sm text-purple-700 mb-1">예산 준수율</p>
    //               <p className="text-xl font-bold">
    //                 {(
    //                   (budgetHistory.filter((item) => item.spent <= item.budget)
    //                     .length /
    //                     budgetHistory.length) *
    //                   100
    //                 ).toFixed(0)}
    //                 %
    //               </p>
    //             </div>
    //           </div>

    //           <div className="bg-gray-50 rounded-lg p-4">
    //             <h4 className="text-sm font-medium mb-2">지출 트렌드 분석</h4>
    //             <p className="text-sm text-gray-600">
    //               {budgetHistory[0]?.spent &&
    //               budgetHistory[1]?.spent &&
    //               budgetHistory[0]?.spent > budgetHistory[1].spent
    //                 ? "지난 달보다 지출이 증가했습니다. 예산 관리에 더 신경써보세요."
    //                 : "지난 달보다 지출이 감소했습니다. 좋은 추세를 유지하세요!"}
    //             </p>
    //           </div>
    //         </div>
    //       ) : (
    //         <div className="bg-gray-50 rounded-lg p-4">
    //           <p className="text-sm text-gray-500 text-center">
    //             분석을 위한 충분한 데이터가 없습니다.
    //           </p>
    //         </div>
    //       )}
    //     </Card>

    //     <Card>
    //       <h3 className="text-lg font-medium mb-4">카테고리별 지출 추이</h3>
    //       {expenseCategories.length > 0 ? (
    //         <>
    //           <div className="h-64 mb-4">
    //             <Radar
    //               data={{
    //                 labels: expenseCategories.map((cat) => cat.name),
    //                 datasets: [
    //                   {
    //                     label: "이번 달",
    //                     data: expenseCategories.map((cat) => cat.amount),
    //                     backgroundColor: "rgba(244, 223, 125, 0.2)", // blockie-yellow
    //                     borderColor: "#F4DF7D",
    //                     pointBackgroundColor: "#F4DF7D",
    //                   },
    //                   {
    //                     label: "지난 달",
    //                     data: expenseCategories.map((cat) => cat.amount * 0.9), // Mock 지난 달 데이터
    //                     backgroundColor: "rgba(125, 192, 244, 0.2)", // blockie-blue
    //                     borderColor: "#7DC0F4",
    //                     pointBackgroundColor: "#7DC0F4",
    //                   },
    //                 ],
    //               }}
    //               options={{
    //                 scales: {
    //                   r: {
    //                     angleLines: {
    //                       display: true,
    //                       color: "rgba(0, 0, 0, 0.05)",
    //                     },
    //                     grid: {
    //                       color: "rgba(0, 0, 0, 0.05)",
    //                     },
    //                     ticks: {
    //                       display: false,
    //                     },
    //                   },
    //                 },
    //                 maintainAspectRatio: false,
    //               }}
    //             />
    //           </div>

    //           <div className="space-y-2">
    //             <h4 className="text-sm font-medium">주요 증감 카테고리</h4>
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
    //               <div className="bg-green-50 rounded-lg p-3 flex items-center">
    //                 <div className="w-2 h-8 bg-green-400 rounded-full mr-3"></div>
    //                 <div>
    //                   <p className="text-sm font-medium">
    //                     가장 많이 절약한 카테고리
    //                   </p>
    //                   <p className="text-sm text-green-700">쇼핑 (-12%)</p>
    //                 </div>
    //               </div>
    //               <div className="bg-red-50 rounded-lg p-3 flex items-center">
    //                 <div className="w-2 h-8 bg-red-400 rounded-full mr-3"></div>
    //                 <div>
    //                   <p className="text-sm font-medium">
    //                     가장 많이 증가한 카테고리
    //                   </p>
    //                   <p className="text-sm text-red-700">식비 (+8%)</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </>
    //       ) : (
    //         <div className="flex flex-col items-center justify-center h-40 text-gray-400">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-12 w-12 mb-2"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={1.5}
    //               d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    //             />
    //           </svg>
    //           <p>카테고리 분석 데이터가 없습니다</p>
    //         </div>
    //       )}
    //     </Card>

    //     <Card className="lg:col-span-2">
    //       <h3 className="text-lg font-medium mb-4">예산 최적화 제안</h3>

    //       <div className="bg-blockie-yellow bg-opacity-10 rounded-lg p-4 mb-4">
    //         <div className="flex items-start">
    //           <div className="flex-shrink-0 mt-1">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="h-5 w-5 text-blockie-yellow"
    //               viewBox="0 0 20 20"
    //               fill="currentColor"
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
    //                 clipRule="evenodd"
    //               />
    //             </svg>
    //           </div>
    //           <div className="ml-3">
    //             <h4 className="text-sm font-medium text-blockie-yellow">
    //               맞춤 예산 추천
    //             </h4>
    //             <p className="text-sm mt-1">
    //               지난 몇 개월간의 지출 패턴을 분석한 결과, 귀하에게 최적화된 월
    //               예산은
    //               <span className="font-bold">
    //                 {" "}
    //                 {(
    //                   (budgetHistory.reduce(
    //                     (acc, item) => acc + item.spent,
    //                     0
    //                   ) /
    //                     budgetHistory.length) *
    //                   1.1
    //                 )
    //                   .toFixed(0)
    //                   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    //                 원
    //               </span>
    //               입니다.
    //             </p>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    //         <div className="bg-gray-50 rounded-lg p-4">
    //           <h4 className="text-sm font-medium mb-2">카테고리별 예산 추천</h4>
    //           <div className="space-y-2">
    //             {expenseCategories.map((category, index) => (
    //               <div
    //                 key={index}
    //                 className="flex justify-between items-center"
    //               >
    //                 <span className="text-sm">{category.name}</span>
    //                 <span className="text-sm font-medium">
    //                   {(category.amount * 1.1)
    //                     .toFixed(0)
    //                     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    //                   원
    //                 </span>
    //               </div>
    //             ))}
    //           </div>
    //         </div>

    //         <div className="bg-gray-50 rounded-lg p-4">
    //           <h4 className="text-sm font-medium mb-2">절약 팁</h4>
    //           <ul className="text-sm space-y-2">
    //             <li className="flex items-start">
    //               <span className="text-green-500 mr-2">•</span>
    //               <span>
    //                 식비: 집에서 식사를 준비하면 외식 비용의 약 50%를 절약할 수
    //                 있습니다.
    //               </span>
    //             </li>
    //             <li className="flex items-start">
    //               <span className="text-green-500 mr-2">•</span>
    //               <span>
    //                 쇼핑: 필요한 물건은 세일 기간에 구매하여 약 20% 절약
    //                 가능합니다.
    //               </span>
    //             </li>
    //             <li className="flex items-start">
    //               <span className="text-green-500 mr-2">•</span>
    //               <span>
    //                 교통: 대중교통 정기권을 활용하면 최대 30%까지 교통비를 줄일
    //                 수 있습니다.
    //               </span>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>

    //       <div className="flex justify-center">
    //         <Button
    //           variant="primary"
    //           onClick={() => {
    //             setNewBudget(
    //               (
    //                 (budgetHistory.reduce((acc, item) => acc + item.spent, 0) /
    //                   budgetHistory.length) *
    //                 1.1
    //               ).toFixed(0)
    //             );
    //             setShowSetBudget(true);
    //           }}
    //         >
    //           추천 예산으로 설정하기
    //         </Button>
    //       </div>
    //     </Card>
    //   </motion.div>
  );
};

export default Insight;
