/*
  Warnings:

  - You are about to drop the column `imageThumUrl` on the `board` table. All the data in the column will be lost.
  - Added the required column `imageThumbUrl` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `board` DROP COLUMN `imageThumUrl`,
    ADD COLUMN `imageThumbUrl` TEXT NOT NULL;
