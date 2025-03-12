/*
  Warnings:

  - Added the required column `frequency` to the `RecurringBill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `RecurringBill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `RecurringBill` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BillStatus" AS ENUM ('PAID', 'UPCOMING', 'DUE_SOON');

-- AlterTable
ALTER TABLE "RecurringBill" ADD COLUMN     "frequency" "FrequencyType" NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "status" "BillStatus" NOT NULL;
