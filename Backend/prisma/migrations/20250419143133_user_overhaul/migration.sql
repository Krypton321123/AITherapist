/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dataComplete` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_no` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "sleepQuality" AS ENUM ('GOOD', 'POOR', 'FAIR', 'WORST', 'EXCELLENT');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "age" TEXT,
ADD COLUMN     "dataComplete" BOOLEAN NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "goal" TEXT,
ADD COLUMN     "medication" BOOLEAN,
ADD COLUMN     "phone_no" TEXT NOT NULL,
ADD COLUMN     "sleepQuality" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
