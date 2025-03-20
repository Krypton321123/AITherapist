-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "chat_id" TEXT NOT NULL,
    "userResponse" TEXT[],
    "AIResponse" TEXT[],
    "userID" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("chat_id")
);

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
