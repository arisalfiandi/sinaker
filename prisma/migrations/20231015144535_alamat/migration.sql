/*
  Warnings:

  - Added the required column `alamat` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `taskperusahaanproduksi` ADD COLUMN `alamat` VARCHAR(128) NOT NULL;
