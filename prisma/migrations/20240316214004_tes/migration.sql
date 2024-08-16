-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `nip` CHAR(18) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(64) NOT NULL DEFAULT 'employee',
    `fungsi` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_nip_key`(`nip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(128) NOT NULL,
    `rentangWaktu` VARCHAR(128) NOT NULL,
    `fungsi` INTEGER NOT NULL,
    `startdate` DATE NOT NULL,
    `enddate` DATE NOT NULL,
    `description` TEXT NULL,
    `isArchived` SMALLINT NOT NULL,
    `projectLeaderId` INTEGER NOT NULL,
    `createdById` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserProject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `projectId` INTEGER NOT NULL,
    `isLeader` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserProject_member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `projectId` INTEGER NOT NULL,
    `isLeader` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(128) NOT NULL,
    `jenisKeg` INTEGER NOT NULL,
    `duedate` DATE NOT NULL,
    `description` TEXT NULL,
    `notes` TEXT NULL,
    `month` INTEGER NOT NULL,
    `jenisSample` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `target` INTEGER NOT NULL,
    `realisasi` INTEGER NOT NULL,
    `unitTarget` VARCHAR(128) NOT NULL,
    `projectId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Perusahaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kip` INTEGER NOT NULL,
    `nama` VARCHAR(128) NOT NULL,
    `desa` VARCHAR(128) NOT NULL,
    `namaDesa` VARCHAR(128) NOT NULL,
    `kecamatan` VARCHAR(128) NOT NULL,
    `namaKec` VARCHAR(128) NOT NULL,
    `alamat` VARCHAR(128) NOT NULL,
    `kegiatan` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroupPerusahaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(128) NOT NULL,
    `fungsi` INTEGER NOT NULL,

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
CREATE TABLE `TimKerja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(128) NOT NULL,
    `fungsi` INTEGER NOT NULL DEFAULT 0,
    `ketuaTim` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimKerjaPegawai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `timKerjaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskPerusahaanProduksi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `perusahaanId` INTEGER NOT NULL,
    `target` INTEGER NOT NULL,
    `pmlId` INTEGER NOT NULL,
    `pclId` INTEGER NOT NULL,
    `gajiPml` INTEGER NOT NULL,
    `gajiPcl` INTEGER NOT NULL,
    `realisasi` INTEGER NOT NULL,
    `desa` VARCHAR(128) NOT NULL,
    `namadesa` VARCHAR(128) NOT NULL,
    `kecamatan` VARCHAR(128) NOT NULL,
    `namaKec` VARCHAR(128) NOT NULL,
    `nama` VARCHAR(128) NOT NULL,
    `alamat` VARCHAR(128) NOT NULL,
    `hasilPencacahan` VARCHAR(128) NOT NULL,
    `idSls` VARCHAR(128) NOT NULL,
    `nbs` VARCHAR(128) NOT NULL,
    `nks` VARCHAR(128) NOT NULL,
    `templateTable` VARCHAR(128) NOT NULL,
    `idSbr` VARCHAR(128) NOT NULL,
    `nus` VARCHAR(128) NOT NULL,
    `duedate` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `TaskPeserta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `mitraId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskOrganik` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `organikId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PesertaGaji` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TaskPerusahaanProduksiId` INTEGER NOT NULL,
    `mitraId` INTEGER NOT NULL,
    `gaji` INTEGER NOT NULL,
    `dateGaji` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `template_table` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(128) NOT NULL,
    `jenisSample` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `template_table_kolom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `templateTableId` INTEGER NOT NULL,
    `kolomTable` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaRapat` VARCHAR(128) NOT NULL,
    `startDate` DATETIME NOT NULL,
    `endDate` DATETIME NOT NULL,
    `duration` INTEGER NOT NULL,
    `tempatRapat` LONGTEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `createdById` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_meet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `meetId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pekerjaan_harian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaKegiatan` VARCHAR(128) NOT NULL,
    `durasi` INTEGER NOT NULL,
    `tanggalSubmit` DATE NOT NULL,
    `taskId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beban_kerja_pegawai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `bebanKerja` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beban_kerja_tim_pegawai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `bebanKerjaTim` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beban_kerja_mitra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mitraId` INTEGER NOT NULL,
    `bebanKerja` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kriteria_beban_kerja_pegawai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kriteria1` DECIMAL(65, 30) NOT NULL,
    `kriteria2` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kriteria_beban_kerja_mitra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kriteria1` DECIMAL(65, 30) NOT NULL,
    `kriteria2` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pencairan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `tahapanId` INTEGER NOT NULL,
    `status` INTEGER NOT NULL,
    `tanggalMulai` DATETIME NOT NULL,
    `tanggalSelesai` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `surat_pencairan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pencairanId` INTEGER NOT NULL,
    `jenis` VARCHAR(191) NOT NULL,
    `lokasi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tahapanId` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pesan_pencairan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tahapanId` INTEGER NOT NULL,
    `pencairanId` INTEGER NOT NULL,
    `pesan` VARCHAR(191) NOT NULL,
    `resolve` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_projectLeaderId_fkey` FOREIGN KEY (`projectLeaderId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProject` ADD CONSTRAINT `UserProject_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProject` ADD CONSTRAINT `UserProject_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProject_member` ADD CONSTRAINT `UserProject_member_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProject_member` ADD CONSTRAINT `UserProject_member_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerusahaanGroup` ADD CONSTRAINT `PerusahaanGroup_perusahaanId_fkey` FOREIGN KEY (`perusahaanId`) REFERENCES `Perusahaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerusahaanGroup` ADD CONSTRAINT `PerusahaanGroup_groupPerusahaanId_fkey` FOREIGN KEY (`groupPerusahaanId`) REFERENCES `GroupPerusahaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimKerja` ADD CONSTRAINT `TimKerja_ketuaTim_fkey` FOREIGN KEY (`ketuaTim`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimKerjaPegawai` ADD CONSTRAINT `TimKerjaPegawai_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimKerjaPegawai` ADD CONSTRAINT `TimKerjaPegawai_timKerjaId_fkey` FOREIGN KEY (`timKerjaId`) REFERENCES `TimKerja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskPerusahaanProduksi` ADD CONSTRAINT `TaskPerusahaanProduksi_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskPerusahaanProduksi` ADD CONSTRAINT `TaskPerusahaanProduksi_perusahaanId_fkey` FOREIGN KEY (`perusahaanId`) REFERENCES `Perusahaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskPeserta` ADD CONSTRAINT `TaskPeserta_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskPeserta` ADD CONSTRAINT `TaskPeserta_mitraId_fkey` FOREIGN KEY (`mitraId`) REFERENCES `Mitra`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskOrganik` ADD CONSTRAINT `TaskOrganik_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskOrganik` ADD CONSTRAINT `TaskOrganik_organikId_fkey` FOREIGN KEY (`organikId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PesertaGaji` ADD CONSTRAINT `PesertaGaji_TaskPerusahaanProduksiId_fkey` FOREIGN KEY (`TaskPerusahaanProduksiId`) REFERENCES `TaskPerusahaanProduksi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PesertaGaji` ADD CONSTRAINT `PesertaGaji_mitraId_fkey` FOREIGN KEY (`mitraId`) REFERENCES `Mitra`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `template_table_kolom` ADD CONSTRAINT `template_table_kolom_templateTableId_fkey` FOREIGN KEY (`templateTableId`) REFERENCES `template_table`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `meet` ADD CONSTRAINT `meet_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_meet` ADD CONSTRAINT `user_meet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_meet` ADD CONSTRAINT `user_meet_meetId_fkey` FOREIGN KEY (`meetId`) REFERENCES `meet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pekerjaan_harian` ADD CONSTRAINT `pekerjaan_harian_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pekerjaan_harian` ADD CONSTRAINT `pekerjaan_harian_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beban_kerja_pegawai` ADD CONSTRAINT `beban_kerja_pegawai_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beban_kerja_tim_pegawai` ADD CONSTRAINT `beban_kerja_tim_pegawai_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beban_kerja_mitra` ADD CONSTRAINT `beban_kerja_mitra_mitraId_fkey` FOREIGN KEY (`mitraId`) REFERENCES `Mitra`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pencairan` ADD CONSTRAINT `pencairan_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `surat_pencairan` ADD CONSTRAINT `surat_pencairan_pencairanId_fkey` FOREIGN KEY (`pencairanId`) REFERENCES `pencairan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pesan_pencairan` ADD CONSTRAINT `pesan_pencairan_pencairanId_fkey` FOREIGN KEY (`pencairanId`) REFERENCES `pencairan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
