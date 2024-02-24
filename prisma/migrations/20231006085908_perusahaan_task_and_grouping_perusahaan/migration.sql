-- CreateTable
CREATE TABLE `GroupPerusahaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PerusahaanGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `perusahaanId` INTEGER NOT NULL,
    `groupPerusahaanId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskPerusahaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `perusahaanId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PerusahaanGroup` ADD CONSTRAINT `PerusahaanGroup_perusahaanId_fkey` FOREIGN KEY (`perusahaanId`) REFERENCES `Perusahaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerusahaanGroup` ADD CONSTRAINT `PerusahaanGroup_groupPerusahaanId_fkey` FOREIGN KEY (`groupPerusahaanId`) REFERENCES `GroupPerusahaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskPerusahaan` ADD CONSTRAINT `TaskPerusahaan_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskPerusahaan` ADD CONSTRAINT `TaskPerusahaan_perusahaanId_fkey` FOREIGN KEY (`perusahaanId`) REFERENCES `Perusahaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
