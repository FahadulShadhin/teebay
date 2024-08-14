/*
  Warnings:

  - Added the required column `rentPriceType` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RentPriceType" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "rentPriceType" "RentPriceType" NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "rentEndDate" TIMESTAMP(3),
ADD COLUMN     "rentStartDate" TIMESTAMP(3);
