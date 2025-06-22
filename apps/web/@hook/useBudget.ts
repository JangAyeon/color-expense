// // hooks/useBudget.ts
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   keepPreviousData,
// } from "@tanstack/react-query";
// import { fetchBudgetStatus, upsertBudget } from "../@utils/apis/budget";

// export function useBudget(year: number, month: number) {
//   const queryClient = useQueryClient();

//   const query = useQuery({
//     queryKey: ["budget", year, month],
//     queryFn: () => fetchBudgetStatus(year, month),
//     placeholderData: keepPreviousData,
//     retry: false,
//   });

//   const mutation = useMutation({
//     mutationFn: upsertBudget,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["budget", year, month] });
//     },
//   });

//   return { query, mutation };
// }
