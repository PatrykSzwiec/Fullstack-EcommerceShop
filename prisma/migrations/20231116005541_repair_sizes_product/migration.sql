/*
  Warnings:

  - You are about to alter the column `size` on the `productsize` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `productsize` MODIFY `size` ENUM('XS', 'S', 'M', 'L', 'XL') NOT NULL;
