/*
  Warnings:

  - You are about to drop the column `kodePencacah` on the `perusahaan` table. All the data in the column will be lost.
  - You are about to drop the column `kodePengawas` on the `perusahaan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `perusahaan` DROP COLUMN `kodePencacah`,
    DROP COLUMN `kodePengawas`;
