-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- DropForeignKey
ALTER TABLE "SupplierUpload" DROP CONSTRAINT "SupplierUpload_supplierId_fkey";

-- AddForeignKey
ALTER TABLE "SupplierUpload" ADD CONSTRAINT "SupplierUpload_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
