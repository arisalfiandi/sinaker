-- CreateTable
CREATE TABLE `TimKerja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(128) NOT NULL,
    `fungsi` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimKerjaPegawai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `timKerjaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TimKerjaPegawai` ADD CONSTRAINT `TimKerjaPegawai_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimKerjaPegawai` ADD CONSTRAINT `TimKerjaPegawai_timKerjaId_fkey` FOREIGN KEY (`timKerjaId`) REFERENCES `TimKerja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
