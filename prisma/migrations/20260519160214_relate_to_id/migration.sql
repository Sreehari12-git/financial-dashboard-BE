/*
  Warnings:

  - You are about to drop the column `relationID` on the `FamilyMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FamilyMember" DROP COLUMN "relationID",
ADD COLUMN     "relatedToId" INTEGER;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_relatedToId_fkey" FOREIGN KEY ("relatedToId") REFERENCES "FamilyMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;
