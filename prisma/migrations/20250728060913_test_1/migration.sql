/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `user_id` on the `branch` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `company_branch` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `person` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `suggestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `suggestion_vote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."branch" DROP CONSTRAINT "branch_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."company" DROP CONSTRAINT "company_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."company_branch" DROP CONSTRAINT "company_branch_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."person" DROP CONSTRAINT "person_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."suggestion" DROP CONSTRAINT "suggestion_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."suggestion_vote" DROP CONSTRAINT "suggestion_vote_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."branch" DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."company" DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."company_branch" DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."person" DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."suggestion" DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."suggestion_vote" DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "branch_user_id_key" ON "public"."branch"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_user_id_key" ON "public"."company"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "person_user_id_key" ON "public"."person"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "suggestion_vote_suggestion_id_user_id_key" ON "public"."suggestion_vote"("suggestion_id", "user_id");

-- AddForeignKey
ALTER TABLE "public"."person" ADD CONSTRAINT "person_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."company" ADD CONSTRAINT "company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."branch" ADD CONSTRAINT "branch_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."suggestion" ADD CONSTRAINT "suggestion_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."suggestion_vote" ADD CONSTRAINT "suggestion_vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."company_branch" ADD CONSTRAINT "company_branch_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
