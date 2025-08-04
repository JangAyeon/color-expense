import { Button } from "@repo/ui";
import { FC } from "react";

interface BudgetModalActionsProps {
  isValidAmount: boolean;
  isSubmitting: boolean;
  onSave: () => Promise<void>;
  onClose: () => void;
}

const BudgetModalActions: FC<BudgetModalActionsProps> = ({
  isValidAmount,
  isSubmitting,
  onSave,
  onClose,
}) => {
  return (
    <div className="flex gap-2 justify-end mt-6">
      <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
        취소
      </Button>
      <Button
        variant="primary"
        onClick={onSave}
        disabled={!isValidAmount || isSubmitting}
      >
        {isSubmitting ? "저장 중..." : "저장"}
      </Button>
    </div>
  );
};

export default BudgetModalActions;
