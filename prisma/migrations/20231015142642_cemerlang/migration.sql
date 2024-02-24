/*
  Warnings:

  - Added the required column `desa` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kecamatan` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaKec` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namadesa` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `taskperusahaanproduksi` ADD COLUMN `desa` VARCHAR(128) NOT NULL,
    ADD COLUMN `kecamatan` VARCHAR(128) NOT NULL,
    ADD COLUMN `nama` VARCHAR(128) NOT NULL,
    ADD COLUMN `namaKec` VARCHAR(128) NOT NULL,
    ADD COLUMN `namadesa` VARCHAR(128) NOT NULL;
