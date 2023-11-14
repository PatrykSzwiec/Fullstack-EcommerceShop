/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `DeliveryAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `DeliveryAddress_userId_key` ON `DeliveryAddress`(`userId`);
