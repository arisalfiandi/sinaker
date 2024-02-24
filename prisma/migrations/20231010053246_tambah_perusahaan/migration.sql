/*
  Warnings:

  - Added the required column `namaDesa` to the `Perusahaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaKec` to the `Perusahaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `perusahaan` ADD COLUMN `namaDesa` VARCHAR(128) NOT NULL,
    ADD COLUMN `namaKec` VARCHAR(128) NOT NULL;
