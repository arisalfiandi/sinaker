/*
  Warnings:

  - Changed the type of `dateGaji` on the `pesertagaji` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `pesertagaji` DROP COLUMN `dateGaji`,
    ADD COLUMN `dateGaji` DATE NOT NULL;
