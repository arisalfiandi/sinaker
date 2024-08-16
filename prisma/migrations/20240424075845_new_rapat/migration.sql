/*
  Warnings:

  - You are about to drop the column `endDate` on the `meet` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `meet` table. All the data in the column will be lost.
  - You are about to alter the column `tanggalMulai` on the `pencairan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggalSelesai` on the `pencairan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggalSPM` on the `pencairan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `endTime` to the `meet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meetDate` to the `meet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `meet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `meet` DROP COLUMN `endDate`,
    DROP COLUMN `startDate`,
    ADD COLUMN `endTime` TIME NOT NULL,
    ADD COLUMN `meetDate` DATE NOT NULL,
    ADD COLUMN `startTime` TIME NOT NULL;

-- AlterTable
ALTER TABLE `pencairan` MODIFY `tanggalMulai` DATETIME NOT NULL,
    MODIFY `tanggalSelesai` DATETIME NOT NULL,
    MODIFY `tanggalSPM` DATETIME NOT NULL;
