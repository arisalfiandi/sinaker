-- CreateTable
CREATE TABLE `idsbr_perusahaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `desa` VARCHAR(128) NOT NULL,
    `namaDesa` VARCHAR(128) NOT NULL,
    `kecamatan` VARCHAR(128) NOT NULL,
    `namaKec` VARCHAR(128) NOT NULL,
    `idSbr` VARCHAR(128) NOT NULL,
    `perusahaan` VARCHAR(64) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
