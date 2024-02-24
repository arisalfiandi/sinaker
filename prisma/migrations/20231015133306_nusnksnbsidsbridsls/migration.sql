/*
  Warnings:

  - Added the required column `idSbr` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idSls` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nbs` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nks` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nus` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `taskperusahaanproduksi` ADD COLUMN `idSbr` VARCHAR(128) NOT NULL,
    ADD COLUMN `idSls` VARCHAR(128) NOT NULL,
    ADD COLUMN `nbs` VARCHAR(128) NOT NULL,
    ADD COLUMN `nks` VARCHAR(128) NOT NULL,
    ADD COLUMN `nus` VARCHAR(128) NOT NULL;
