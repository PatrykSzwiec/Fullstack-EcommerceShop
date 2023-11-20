/*
  Warnings:

  - You are about to drop the column `userId` on the `password` table. All the data in the column will be lost.
  - Made the column `userId` on table `cart` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `password` DROP FOREIGN KEY `Password_userId_fkey`;

-- AlterTable
ALTER TABLE `cart` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `password` DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `Password` ADD CONSTRAINT `Password_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
