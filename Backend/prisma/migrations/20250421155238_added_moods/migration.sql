-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('NEUTRAL', 'SAD', 'ANXIOUS', 'HAPPY', 'EXCITED');

-- CreateTable
CREATE TABLE "moodTrack" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "mood" "Mood" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "moodTrack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "moodTrack" ADD CONSTRAINT "moodTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
