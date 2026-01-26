/*
  Warnings:

  - You are about to drop the column `className` on the `member` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - A unique constraint covering the columns `[studentId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `member` DROP COLUMN `className`,
    ADD COLUMN `class` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `joinDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `memberType` ENUM('MEMBER', 'GUEST') NOT NULL DEFAULT 'GUEST',
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `studentId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `dueDate` DATETIME(3) NOT NULL,
    ADD COLUMN `fine` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    MODIFY `status` ENUM('RESERVED', 'BORROWED', 'RETURNED', 'OVERDUE', 'LOST') NOT NULL DEFAULT 'BORROWED';

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('ADMIN', 'MEMBER', 'OFFICER') NOT NULL DEFAULT 'MEMBER';

-- CreateIndex
CREATE UNIQUE INDEX `Member_studentId_key` ON `Member`(`studentId`);
