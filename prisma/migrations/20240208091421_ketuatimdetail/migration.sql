-- AddForeignKey
ALTER TABLE `TimKerja` ADD CONSTRAINT `TimKerja_ketuaTim_fkey` FOREIGN KEY (`ketuaTim`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
