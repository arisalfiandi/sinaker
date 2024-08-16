/*
  Warnings:

  - You are about to alter the column `tanggalMulai` on the `pencairan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggalSelesai` on the `pencairan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggalSPM` on the `pencairan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `importStatus` to the `sub_kegiatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `importStatus` to the `TaskPerusahaanProduksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pencairan` MODIFY `tanggalMulai` DATETIME NOT NULL,
    MODIFY `tanggalSelesai` DATETIME NOT NULL,
    MODIFY `tanggalSPM` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `sub_kegiatan` ADD COLUMN `importStatus` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `taskperusahaanproduksi` ADD COLUMN `importStatus` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `data_target_realisasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `target` INTEGER NOT NULL,
    `pmlId` INTEGER NOT NULL,
    `pclId` INTEGER NOT NULL,
    `gajiPml` INTEGER NOT NULL,
    `gajiPcl` INTEGER NOT NULL,
    `realisasi` INTEGER NOT NULL,
    `desa` VARCHAR(128) NOT NULL,
    `namadesa` VARCHAR(128) NOT NULL,
    `namaKec` VARCHAR(128) NOT NULL,
    `kecamatan` VARCHAR(128) NOT NULL,
    `hasilPencacahan` VARCHAR(128) NOT NULL,
    `kol1` VARCHAR(128) NOT NULL,
    `kol2` VARCHAR(128) NOT NULL,
    `templateTable` VARCHAR(128) NOT NULL,
    `duedate` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `data_target_realisasi` ADD CONSTRAINT `data_target_realisasi_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `sub_kegiatan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
