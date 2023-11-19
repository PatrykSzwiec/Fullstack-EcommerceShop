/*
  Warnings:

  - You are about to drop the `_carttoproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ordertoproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_carttoproduct` DROP FOREIGN KEY `_CartToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_carttoproduct` DROP FOREIGN KEY `_CartToProduct_B_fkey`;

-- DropForeignKey
ALTER TABLE `_ordertoproduct` DROP FOREIGN KEY `_OrderToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ordertoproduct` DROP FOREIGN KEY `_OrderToProduct_B_fkey`;

-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropIndex
DROP INDEX `Cart_id_key` ON `cart`;

-- AlterTable
ALTER TABLE `cart` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `cartId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_carttoproduct`;

-- DropTable
DROP TABLE `_ordertoproduct`;

-- DropTable
DROP TABLE `order`;

-- CreateIndex
CREATE UNIQUE INDEX `Cart_userId_key` ON `Cart`(`userId`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
