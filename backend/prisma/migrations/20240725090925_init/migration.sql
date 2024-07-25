-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ASSIGNED', 'SUCCESS', 'DROPPED');

-- CreateEnum
CREATE TYPE "Method" AS ENUM ('BANK', 'CASH', 'AED', 'CRYPTO');

-- CreateEnum
CREATE TYPE "Wallet" AS ENUM ('WALLET1', 'WALLET2', 'WALLET3');

-- CreateTable
CREATE TABLE "Settlement" (
    "id" TEXT NOT NULL,
    "merchant_id" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "method" "Method" NOT NULL,
    "acc_name" TEXT,
    "acc_no" TEXT,
    "ifsc" TEXT,
    "refrence_id" TEXT NOT NULL,
    "rejected_reason" TEXT,
    "wallet" "Wallet",
    "wallet_address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settlement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Merchant" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
