-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateEnum
CREATE TYPE "SupplierContactType" AS ENUM ('EMAIL', 'PHONE');

-- CreateEnum
CREATE TYPE "SupplierType" AS ENUM ('COMPANY_SUPPLIER', 'INDIVIDUAL_SUPPLIER');

-- CreateEnum
CREATE TYPE "TourType" AS ENUM ('WALKING', 'CITY', 'FIELD');

-- CreateTable
CREATE TABLE "Supplier" (
    "id" UUID NOT NULL,
    "type" "SupplierType" NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "socialLinks" TEXT[],
    "aboutMe" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierContactVerification" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "codeExpiresAt" TIMESTAMP(3) NOT NULL,
    "contact" TEXT NOT NULL,
    "type" "SupplierContactType" NOT NULL,
    "contactVerifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "supplierId" UUID NOT NULL,

    CONSTRAINT "SupplierContactVerification_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "SupplierProfilePhotoUpload" (
    "id" UUID NOT NULL,
    "originalStorageLink" TEXT NOT NULL,
    "compressedMediumStorageLink" TEXT NOT NULL,
    "compressedPreviewStorageLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "supplierId" UUID NOT NULL,

    CONSTRAINT "SupplierProfilePhotoUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierCertificateUpload" (
    "id" UUID NOT NULL,
    "storageLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "supplierId" UUID,

    CONSTRAINT "SupplierCertificateUpload_pkey" PRIMARY KEY ("id")
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
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "program" JSONB NOT NULL,
    "supplierId" UUID NOT NULL,
    "locationId" UUID NOT NULL,

    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TourDate" (
    "id" UUID NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tourId" UUID NOT NULL,

    CONSTRAINT "TourDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TourReservation" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "tourDateId" UUID NOT NULL,

    CONSTRAINT "TourReservation_pkey" PRIMARY KEY ("id")
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
    "tourId" UUID,
    "supplierId" UUID NOT NULL,

    CONSTRAINT "TourPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Supplier_email_idx" ON "Supplier"("email");

-- CreateIndex
CREATE INDEX "Supplier_phone_idx" ON "Supplier"("phone");

-- CreateIndex
CREATE INDEX "SupplierContactVerification_contact_idx" ON "SupplierContactVerification"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "CompanySupplier_supplierId_key" ON "CompanySupplier"("supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualSupplier_supplierId_key" ON "IndividualSupplier"("supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierProfilePhotoUpload_supplierId_key" ON "SupplierProfilePhotoUpload"("supplierId");

-- AddForeignKey
ALTER TABLE "SupplierContactVerification" ADD CONSTRAINT "SupplierContactVerification_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanySupplier" ADD CONSTRAINT "CompanySupplier_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualSupplier" ADD CONSTRAINT "IndividualSupplier_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierProfilePhotoUpload" ADD CONSTRAINT "SupplierProfilePhotoUpload_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierCertificateUpload" ADD CONSTRAINT "SupplierCertificateUpload_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourDate" ADD CONSTRAINT "TourDate_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourReservation" ADD CONSTRAINT "TourReservation_tourDateId_fkey" FOREIGN KEY ("tourDateId") REFERENCES "TourDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourPhoto" ADD CONSTRAINT "TourPhoto_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourPhoto" ADD CONSTRAINT "TourPhoto_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
