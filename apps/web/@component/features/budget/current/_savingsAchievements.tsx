// "use client";

// import { motion, AnimatePresence } from "framer-motion";

// import Card from "@component/budget/card";

// interface Achievement {
//   title: string;
//   description: string;
//   earned: boolean;
//   icon: string;
//   date?: string;
//   progress?: number;
// }

// const SavingsAchievements: React.FC = () => {
//   const achievements: Achievement[] = [
//     {
//       title: "절약 달인",
//       description: "이번 달 목표 대비 15% 절약",
//       earned: true,
//       icon: "🏆",
//       date: "2025-07-15",
//     },
//     {
//       title: "예산 킬러",
//       description: "3개월 연속 예산 내 지출",
//       earned: true,
//       icon: "🎯",
//       date: "2025-07-01",
//     },
//     {
//       title: "외식 절약왕",
//       description: "외식비 50% 절약하기",
//       earned: false,
//       icon: "🍽️",
//       progress: 78,
//     },
//   ];

//   const totalSaved: number = 127000;
//   const monthlyGoal: number = 150000;

//   return (
//     <Card>
//       <h3 className="text-lg font-semibold mb-6 text-gray-800">절약 성과</h3>

//       {/* 이번 달 절약 현황 */}
//       <div className="mb-6 p-5 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-xl border border-emerald-100">
//         <div className="flex justify-between items-center mb-3">
//           <span className="text-sm font-medium text-gray-700">
//             이번 달 절약 금액
//           </span>
//           <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
//             {totalSaved.toLocaleString()}원
//           </span>
//         </div>
//         <div className="relative h-3 bg-white/60 rounded-full overflow-hidden backdrop-blur-sm">
//           <motion.div
//             className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"
//             initial={{ width: 0 }}
//             animate={{ width: `${(totalSaved / monthlyGoal) * 100}%` }}
//             transition={{ duration: 1.2, ease: "easeOut" }}
//           />
//         </div>
//         <p className="text-xs text-gray-600 mt-2">
//           목표까지 {(monthlyGoal - totalSaved).toLocaleString()}원 남음
//         </p>
//       </div>

//       {/* 달성 배지 */}
//       <div className="space-y-3">
//         <h4 className="text-sm font-medium text-gray-700 mb-4">달성 배지</h4>
//         {achievements.map((achievement: Achievement, index: number) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, scale: 0.95, x: -10 }}
//             animate={{ opacity: 1, scale: 1, x: 0 }}
//             transition={{ delay: index * 0.1, duration: 0.3 }}
//             className={`p-4 rounded-xl border-2 transition-all duration-300 ${
//               achievement.earned
//                 ? "border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 hover:shadow-md"
//                 : "border-gray-200 bg-gray-50 hover:bg-gray-100"
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <span
//                   className={`text-2xl transition-all duration-300 ${
//                     achievement.earned ? "scale-110" : "grayscale opacity-60"
//                   }`}
//                 >
//                   {achievement.icon}
//                 </span>
//                 <div>
//                   <h5
//                     className={`font-medium ${
//                       achievement.earned ? "text-amber-800" : "text-gray-500"
//                     }`}
//                   >
//                     {achievement.title}
//                   </h5>
//                   <p
//                     className={`text-xs ${
//                       achievement.earned ? "text-amber-600" : "text-gray-400"
//                     }`}
//                   >
//                     {achievement.description}
//                   </p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 {achievement.earned ? (
//                   <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-lg">
//                     {achievement.date}
//                   </span>
//                 ) : (
//                   <div className="text-right">
//                     <span className="text-xs text-gray-500 font-medium">
//                       {achievement.progress}%
//                     </span>
//                     <div className="w-16 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
//                       <motion.div
//                         className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
//                         initial={{ width: 0 }}
//                         animate={{ width: `${achievement.progress}%` }}
//                         transition={{ duration: 1, delay: index * 0.2 }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* 다음 도전 과제 */}
//       <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
//         <h4 className="text-sm font-medium text-blue-800 mb-3">
//           다음 도전 과제
//         </h4>
//         <div className="space-y-2">
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-blue-700">🚗 교통비 절약 챌린지</span>
//             <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg font-medium">
//               +5,000원
//             </span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-blue-700">📱 구독 서비스 정리</span>
//             <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg font-medium">
//               +15,000원
//             </span>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default SavingsAchievements;
