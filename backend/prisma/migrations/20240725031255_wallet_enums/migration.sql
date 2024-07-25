/*
  Warnings:

  - The `wallet` column on the `Settlement` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Wallet" AS ENUM ('WALLET1', 'WALLET2', 'WALLET3');

-- AlterTable
ALTER TABLE "Settlement" DROP COLUMN "wallet",
ADD COLUMN     "wallet" "Wallet";
