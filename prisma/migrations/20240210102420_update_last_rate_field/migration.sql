-- DropForeignKey
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_lastRateId_fkey";

-- AlterTable
ALTER TABLE "Auction" ALTER COLUMN "lastRateId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_lastRateId_fkey" FOREIGN KEY ("lastRateId") REFERENCES "Rate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
