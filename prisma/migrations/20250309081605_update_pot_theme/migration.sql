/*
  Warnings:

  - Added the required column `theme` to the `Pot` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PotTheme" AS ENUM ('GREEN', 'YELLOW', 'CYAN', 'NAVY', 'RED', 'PURPLE', 'TURQUOISE', 'BROWN', 'MAGENTA', 'BLUE', 'GREY', 'ARMY', 'PINK');

-- AlterTable
ALTER TABLE "Pot" ADD COLUMN     "theme" "PotTheme" NOT NULL;
