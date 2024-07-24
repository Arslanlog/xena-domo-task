/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `TransactionSession` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `TransactionSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionSession" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TransactionSession_userId_key" ON "TransactionSession"("userId");

-- AddForeignKey
ALTER TABLE "TransactionSession" ADD CONSTRAINT "TransactionSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
