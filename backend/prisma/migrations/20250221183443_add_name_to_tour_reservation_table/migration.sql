/*
  Warnings:

  - Made the column `pricePerPerson` on table `Tour` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `TourReservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tour" ALTER COLUMN "pricePerPerson" SET NOT NULL;

-- AlterTable
ALTER TABLE "TourReservation" ADD COLUMN     "name" TEXT NOT NULL;
