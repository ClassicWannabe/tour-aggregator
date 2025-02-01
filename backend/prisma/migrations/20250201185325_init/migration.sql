-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateEnum
CREATE TYPE "SupplierType" AS ENUM ('COMPANY_SUPPLIER', 'INDIVIDUAL_SUPPLIER');

-- CreateEnum
CREATE TYPE "TourType" AS ENUM ('WALKING', 'CITY', 'FIELD');

-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "TourRepeatPattern" AS ENUM ('WEEKLY', 'BIWEEKLY', 'THREE_WEEKLY', 'MONTHLY');

-- CreateTable
CREATE TABLE "Supplier" (
    "id" UUID NOT NULL,
    "type" "SupplierType" NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "socialLinks" TEXT[],
    "aboutMe" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationCode" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supplierId" UUID NOT NULL,

    CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanySupplier" (
    "id" UUID NOT NULL,
    "ownerName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "supplierId" UUID NOT NULL,

    CONSTRAINT "CompanySupplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndividualSupplier" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "supplierId" UUID NOT NULL,

    CONSTRAINT "IndividualSupplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierUpload" (
    "id" UUID NOT NULL,
    "storageLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supplierId" UUID NOT NULL,

    CONSTRAINT "SupplierUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tour" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "thesis" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isTransportIncluded" BOOLEAN NOT NULL,
    "pricePerPerson" INTEGER,
    "peopleCount" INTEGER NOT NULL,
    "type" "TourType" NOT NULL,
    "inclusions" TEXT[],
    "exclusions" TEXT[],
    "contacts" TEXT[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "program" JSONB NOT NULL,
    "supplierId" UUID NOT NULL,
    "locationId" UUID NOT NULL,

    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecurringTour" (
    "id" UUID NOT NULL,
    "weekdays" "Weekday"[],
    "repeatPattern" "TourRepeatPattern" NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tourId" UUID NOT NULL,

    CONSTRAINT "RecurringTour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TourPhoto" (
    "id" UUID NOT NULL,
    "originalStorageLink" TEXT NOT NULL,
    "compressedMediumStorageLink" TEXT NOT NULL,
    "compressedPreviewStorageLink" TEXT NOT NULL,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "tourId" UUID,

    CONSTRAINT "TourPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CompanySupplier_supplierId_key" ON "CompanySupplier"("supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualSupplier_supplierId_key" ON "IndividualSupplier"("supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "RecurringTour_tourId_key" ON "RecurringTour"("tourId");

-- AddForeignKey
ALTER TABLE "VerificationCode" ADD CONSTRAINT "VerificationCode_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanySupplier" ADD CONSTRAINT "CompanySupplier_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualSupplier" ADD CONSTRAINT "IndividualSupplier_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierUpload" ADD CONSTRAINT "SupplierUpload_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringTour" ADD CONSTRAINT "RecurringTour_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourPhoto" ADD CONSTRAINT "TourPhoto_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;
