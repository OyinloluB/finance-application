/*
  Warnings:

  - Changed the type of `theme` on the `Budget` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `theme` on the `Pot` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "theme",
ADD COLUMN     "theme" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pot" DROP COLUMN "theme",
ADD COLUMN     "theme" TEXT NOT NULL;
