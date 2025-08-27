/*
  Warnings:

  - Made the column `curriculum` on table `person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `disability_type` on table `person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `job_profile` on table `person` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "person" ALTER COLUMN "curriculum" SET NOT NULL,
ALTER COLUMN "disability_type" SET NOT NULL,
ALTER COLUMN "location" SET NOT NULL,
ALTER COLUMN "job_profile" SET NOT NULL;
