/*
  Warnings:

  - You are about to drop the `taskperusahaan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `taskperusahaan` DROP FOREIGN KEY `TaskPerusahaan_perusahaanId_fkey`;

-- DropForeignKey
ALTER TABLE `taskperusahaan` DROP FOREIGN KEY `TaskPerusahaan_taskId_fkey`;

-- DropTable
DROP TABLE `taskperusahaan`;

-- CreateTable
CREATE TABLE `TaskPerusahaanProduksi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `perusahaanId` INTEGER NOT NULL,
    `target` INTEGER NOT NULL,
    `realisasi` INTEGER NOT NULL,
    `hasilPencacahan` VARCHAR(128) NOT NULL,
    `duedate` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TaskPerusahaanProduksi` ADD CONSTRAINT `TaskPerusahaanProduksi_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskPerusahaanProduksi` ADD CONSTRAINT `TaskPerusahaanProduksi_perusahaanId_fkey` FOREIGN KEY (`perusahaanId`) REFERENCES `Perusahaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
