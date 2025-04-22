/*
  Warnings:

  - You are about to drop the column `userId` on the `moodTrack` table. All the data in the column will be lost.
  - Added the required column `username` to the `moodTrack` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "moodTrack" DROP CONSTRAINT "moodTrack_userId_fkey";

-- AlterTable
ALTER TABLE "moodTrack" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "moodTrack" ADD CONSTRAINT "moodTrack_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
