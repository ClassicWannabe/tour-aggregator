import { PrismaClient } from '@prisma/client';
import { populateLocations } from './populate-locations';

const prisma = new PrismaClient();

const main = async () => {
  console.log('Starting DB seed process...');
  await prisma.$transaction(async (tx) => {
    await populateLocations(tx);
  });
  console.log('Successfully finished DB seed process...');
};

main()
  .catch((e) => {
    console.error('Error while seeding DB...');
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
