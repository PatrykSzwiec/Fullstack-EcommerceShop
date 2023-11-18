/*
  Warnings:

  - You are about to drop the `deliveryaddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `deliveryaddress` DROP FOREIGN KEY `DeliveryAddress_userId_fkey`;

-- DropTable
DROP TABLE `deliveryaddress`;
