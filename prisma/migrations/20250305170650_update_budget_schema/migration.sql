/*
  Warnings:

  - Changed the type of `theme` on the `Budget` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BudgetTheme" AS ENUM ('GREEN', 'YELLOW', 'CYAN', 'NAVY', 'RED', 'PURPLE', 'TURQUOISE', 'BROWN', 'MAGENTA', 'BLUE', 'GREY', 'ARMY', 'PINK');

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "remaining" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "currentSpend" SET DEFAULT 0,
DROP COLUMN "theme",
ADD COLUMN     "theme" "BudgetTheme" NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "budgetId" TEXT;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE SET NULL ON UPDATE CASCADE;
