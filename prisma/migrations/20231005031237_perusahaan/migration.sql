-- CreateTable
CREATE TABLE `Perusahaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kip` INTEGER NOT NULL,
    `nama` VARCHAR(128) NOT NULL,
    `desa` VARCHAR(128) NOT NULL,
    `kecamatan` VARCHAR(128) NOT NULL,
    `alamat` VARCHAR(128) NOT NULL,
    `kegiatan` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
