/*
  Warnings:

  - You are about to drop the column `cartId` on the `productsize` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `productsize` DROP FOREIGN KEY `ProductSize_cartId_fkey`;

-- AlterTable
ALTER TABLE `productsize` DROP COLUMN `cartId`;

-- CreateTable
CREATE TABLE `CartItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cartId` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,
    `size` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
