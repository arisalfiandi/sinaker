/*
  Warnings:

  - Added the required column `kodePencacah` to the `Perusahaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodePengawas` to the `Perusahaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `perusahaan` ADD COLUMN `kodePencacah` INTEGER NOT NULL,
    ADD COLUMN `kodePengawas` INTEGER NOT NULL;
