/*
  Warnings:

  - You are about to alter the column `rentangWaktu` on the `project` table. The data in that column could be lost. The data in that column will be cast from `VarChar(128)` to `Int`.

*/
-- AlterTable
ALTER TABLE `project` MODIFY `rentangWaktu` INTEGER NOT NULL;
