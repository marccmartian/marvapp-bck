-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'EDITOR', 'VIEWER');

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "serialId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "imageUrl" TEXT,
    "githubUrl" TEXT NOT NULL,
    "prodUrl" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "isTop" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'VIEWER',
    "avatar" TEXT,
    "isEmailValidated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_serialId_key" ON "public"."Project"("serialId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_key" ON "public"."Project"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Project_imageUrl_key" ON "public"."Project"("imageUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Project_githubUrl_key" ON "public"."Project"("githubUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Project_prodUrl_key" ON "public"."Project"("prodUrl");

-- CreateIndex
CREATE INDEX "Project_title_description_tags_idx" ON "public"."Project"("title", "description", "tags");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_name_surname_email_idx" ON "public"."User"("name", "surname", "email");

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
