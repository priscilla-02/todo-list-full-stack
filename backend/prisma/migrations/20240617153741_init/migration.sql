/*
  Warnings:

  - Added the required column `email` to the `todo_list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `todo_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todo_list` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;
