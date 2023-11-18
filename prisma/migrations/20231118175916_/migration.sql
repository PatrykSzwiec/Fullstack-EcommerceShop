/*
  Warnings:

  - You are about to alter the column `color` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `color` VARCHAR(191) NOT NULL;
