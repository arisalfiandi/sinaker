/*
  Warnings:

  - Added the required column `gajiPcl` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gajiPml` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pclId` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pmlId` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `taskperusahaanproduksi` ADD COLUMN `gajiPcl` INTEGER NOT NULL,
    ADD COLUMN `gajiPml` INTEGER NOT NULL,
    ADD COLUMN `pclId` INTEGER NOT NULL,
    ADD COLUMN `pmlId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `TaskPeserta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `mitraId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PesertaGaji` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TaskPerusahaanProduksiId` INTEGER NOT NULL,
    `mitraId` INTEGER NOT NULL,
    `gaji` INTEGER NOT NULL,
    `dateGaji` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TaskPeserta` ADD CONSTRAINT `TaskPeserta_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskPeserta` ADD CONSTRAINT `TaskPeserta_mitraId_fkey` FOREIGN KEY (`mitraId`) REFERENCES `Mitra`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PesertaGaji` ADD CONSTRAINT `PesertaGaji_TaskPerusahaanProduksiId_fkey` FOREIGN KEY (`TaskPerusahaanProduksiId`) REFERENCES `TaskPerusahaanProduksi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PesertaGaji` ADD CONSTRAINT `PesertaGaji_mitraId_fkey` FOREIGN KEY (`mitraId`) REFERENCES `Mitra`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
