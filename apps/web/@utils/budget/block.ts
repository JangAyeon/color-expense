export const BUDGET_CONFIG = {
  MAX_BLOCKS: 100,
  DIVIDER: 1000,
} as const;

export const calculateBlocks = (budgetAmount: string) => {
  const amount = parseInt(budgetAmount, 10);
  const totalBlocks = Math.floor(amount / BUDGET_CONFIG.DIVIDER);
  const actualBlocks = Math.min(totalBlocks, BUDGET_CONFIG.MAX_BLOCKS);
  const restBlocks = totalBlocks - BUDGET_CONFIG.MAX_BLOCKS;
  const isOverflow = amount > BUDGET_CONFIG.MAX_BLOCKS * BUDGET_CONFIG.DIVIDER;

  return {
    actualBlocks,
    restBlocks,
    isOverflow,
    totalBlocks,
  };
};
