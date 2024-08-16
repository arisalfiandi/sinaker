/*
  Warnings:

  - You are about to alter the column `startDate` on the `meet` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endDate` on the `meet` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggalMulai` on the `pencairan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `kriteria3` to the `kriteria_beban_kerja_mitra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `meet` table without a default value. This is not possible if the table is not empty.
  - Made the column `tanggalSelesai` on table `pencairan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tanggalSPM` on table `pencairan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `kriteria_beban_kerja_mitra` ADD COLUMN `kriteria3` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `meet` ADD COLUMN `status` VARCHAR(128) NOT NULL,
    MODIFY `startDate` DATETIME NOT NULL,
    MODIFY `endDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `pencairan` MODIFY `tanggalMulai` DATETIME NOT NULL,
    MODIFY `tanggalSelesai` DATETIME NOT NULL,
    MODIFY `tanggalSPM` DATETIME NOT NULL;
