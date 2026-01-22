/*
  Warnings:

  - A unique constraint covering the columns `[memberId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_memberId_key` ON `User`(`memberId`);
