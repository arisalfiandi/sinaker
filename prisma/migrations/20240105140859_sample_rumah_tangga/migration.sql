-- CreateTable
CREATE TABLE `nbs_nks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `desa` VARCHAR(128) NOT NULL,
    `namadesa` VARCHAR(128) NOT NULL,
    `kecamatan` VARCHAR(128) NOT NULL,
    `namaKec` VARCHAR(128) NOT NULL,
    `nbs` INTEGER NOT NULL,
    `nks` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nbs_idsls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `desa` VARCHAR(128) NOT NULL,
    `namadesa` VARCHAR(128) NOT NULL,
    `kecamatan` VARCHAR(128) NOT NULL,
    `namaKec` VARCHAR(128) NOT NULL,
    `nbs` INTEGER NOT NULL,
    `id_sls` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nus_dinas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `desa` VARCHAR(128) NOT NULL,
    `namadesa` VARCHAR(128) NOT NULL,
    `kecamatan` VARCHAR(128) NOT NULL,
    `namaKec` VARCHAR(128) NOT NULL,
    `nus` INTEGER NOT NULL,
    `dinas` VARCHAR(64) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
