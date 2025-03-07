-- DropForeignKey
ALTER TABLE "TourReservation" DROP CONSTRAINT "TourReservation_tourDateId_fkey";

-- AddForeignKey
ALTER TABLE "TourReservation" ADD CONSTRAINT "TourReservation_tourDateId_fkey" FOREIGN KEY ("tourDateId") REFERENCES "TourDate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
