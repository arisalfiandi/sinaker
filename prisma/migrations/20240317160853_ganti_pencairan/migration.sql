/*
  Warnings:

  - You are about to alter the column `startDate` on the `meet` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endDate` on the `meet` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggalMulai` on the `pencairan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggalSelesai` on the `pencairan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `jenis` on the `surat_pencairan` table. All the data in the column will be lost.
  - You are about to drop the `tahapanid` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `jenisId` to the `surat_pencairan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `meet` MODIFY `startDate` DATETIME NOT NULL,
    MODIFY `endDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `pencairan` MODIFY `tanggalMulai` DATETIME NOT NULL,
    MODIFY `tanggalSelesai` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `surat_pencairan` DROP COLUMN `jenis`,
    ADD COLUMN `jenisId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `tahapanid`;

-- CreateTable
CREATE TABLE `jenis_surat_pencairan` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tahap_pencairan` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pencairan` ADD CONSTRAINT `pencairan_tahapanId_fkey` FOREIGN KEY (`tahapanId`) REFERENCES `tahap_pencairan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `surat_pencairan` ADD CONSTRAINT `surat_pencairan_jenisId_fkey` FOREIGN KEY (`jenisId`) REFERENCES `jenis_surat_pencairan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pesan_pencairan` ADD CONSTRAINT `pesan_pencairan_tahapanId_fkey` FOREIGN KEY (`tahapanId`) REFERENCES `tahap_pencairan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
