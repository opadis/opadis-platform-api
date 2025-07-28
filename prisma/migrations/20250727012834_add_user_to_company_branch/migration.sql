/*
  Warnings:

  - Added the required column `user_id` to the `company_branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company_branch" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "company_branch" ADD CONSTRAINT "company_branch_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
