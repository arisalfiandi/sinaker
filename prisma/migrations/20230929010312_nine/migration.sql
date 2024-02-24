/*
  Warnings:

  - You are about to alter the column `fungsi` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(64)` to `Int`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `fungsi` INTEGER NOT NULL;
