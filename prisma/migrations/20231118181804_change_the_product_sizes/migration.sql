/*
  Warnings:

  - You are about to alter the column `size` on the `productsize` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - Added the required column `quantity` to the `ProductSize` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productsize` ADD COLUMN `quantity` INTEGER NOT NULL,
    MODIFY `size` VARCHAR(191) NOT NULL;
