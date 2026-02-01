-- CreateEnum
CREATE TYPE "PeopleState" AS ENUM ('UNASSOCIATED', 'BOSS', 'EMPLOYEE');

-- CreateTable
CREATE TABLE "peoples" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "image_filename" TEXT,
    "state" "PeopleState" NOT NULL DEFAULT 'UNASSOCIATED',
    "company_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "peoples_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "boss_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "peoples_email_key" ON "peoples"("email");

-- CreateIndex
CREATE UNIQUE INDEX "company_name_key" ON "company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "company_boss_id_key" ON "company"("boss_id");

-- AddForeignKey
ALTER TABLE "peoples" ADD CONSTRAINT "peoples_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_boss_id_fkey" FOREIGN KEY ("boss_id") REFERENCES "peoples"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
