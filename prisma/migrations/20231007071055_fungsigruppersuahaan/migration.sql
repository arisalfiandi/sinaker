/*
  Warnings:

  - Added the required column `fungsi` to the `GroupPerusahaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `groupperusahaan` ADD COLUMN `fungsi` INTEGER NOT NULL;
