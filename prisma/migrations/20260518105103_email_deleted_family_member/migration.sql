/*
  Warnings:

  - You are about to drop the column `email` on the `FamilyMember` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "FamilyMember_email_key";

-- AlterTable
ALTER TABLE "FamilyMember" DROP COLUMN "email";
