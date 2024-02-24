-- CreateTable
CREATE TABLE `Mitra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nik` VARCHAR(128) NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `jenisKelamin` VARCHAR(64) NOT NULL,
    `tanggalLahir` DATE NOT NULL,
    `umur` INTEGER NOT NULL,
    `pendidikan` VARCHAR(128) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `status` VARCHAR(64) NOT NULL DEFAULT 'internal',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
