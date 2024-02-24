/*
  Warnings:

  - Added the required column `isLeader` to the `UserProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userproject` ADD COLUMN `isLeader` INTEGER NOT NULL;
