/*
  Warnings:

  - You are about to drop the column `fungsi` on the `task` table. All the data in the column will be lost.
  - Added the required column `fungsi` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenisKeg` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` ADD COLUMN `fungsi` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `fungsi`,
    ADD COLUMN `jenisKeg` INTEGER NOT NULL;
