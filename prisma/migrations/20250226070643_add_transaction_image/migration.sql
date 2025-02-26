/*
  Warnings:

  - You are about to drop the column `title` on the `Transaction` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - Added the required column `name` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "title",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30);
