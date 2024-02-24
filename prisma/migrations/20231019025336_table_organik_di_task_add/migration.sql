-- CreateTable
CREATE TABLE `TaskOrganik` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `organikId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TaskOrganik` ADD CONSTRAINT `TaskOrganik_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskOrganik` ADD CONSTRAINT `TaskOrganik_organikId_fkey` FOREIGN KEY (`organikId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
