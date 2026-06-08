/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `FamilyMember` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "FamilyMember" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "FamilyMember_email_key" ON "FamilyMember"("email");
