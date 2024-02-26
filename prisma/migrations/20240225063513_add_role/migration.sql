-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Customer');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Customer';
