-- CreateEnum
CREATE TYPE "SupplierType" AS ENUM ('CompanySupplier', 'IndividualSupplier');

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
    "transportDescription" TEXT,
    "pricePerPerson" INTEGER NOT NULL,
    "peopleCount" INTEGER NOT NULL,
    "contacts" TEXT[],
    "highlights" TEXT[],
    "inclusions" TEXT[],
    "exclusions" TEXT[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "supplierId" UUID NOT NULL,

    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TourPhoto" (
    "id" UUID NOT NULL,
    "originalStorageLink" TEXT NOT NULL,
    "optimizedStorageLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tourId" UUID NOT NULL,

    CONSTRAINT "TourPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TourItinerary" (
    "id" UUID NOT NULL,
    "time" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tourId" UUID NOT NULL,

    CONSTRAINT "TourItinerary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CompanySupplier_supplierId_key" ON "CompanySupplier"("supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualSupplier_supplierId_key" ON "IndividualSupplier"("supplierId");

-- AddForeignKey
ALTER TABLE "VerificationCode" ADD CONSTRAINT "VerificationCode_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanySupplier" ADD CONSTRAINT "CompanySupplier_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualSupplier" ADD CONSTRAINT "IndividualSupplier_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierUpload" ADD CONSTRAINT "SupplierUpload_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourPhoto" ADD CONSTRAINT "TourPhoto_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourItinerary" ADD CONSTRAINT "TourItinerary_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;
