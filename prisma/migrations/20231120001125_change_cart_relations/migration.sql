/*
  Warnings:

  - You are about to drop the column `cartId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_cartId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `cartId`;

-- AlterTable
ALTER TABLE `productsize` ADD COLUMN `cartId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ProductSize` ADD CONSTRAINT `ProductSize_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
