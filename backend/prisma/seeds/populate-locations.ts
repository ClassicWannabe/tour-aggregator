import { PrismaTransactionClient } from './types';

const locations = [{ name: 'Almaty' }, { name: 'Astana' }];

export const populateLocations = async (prisma: PrismaTransactionClient) => {
  console.log('Populate Location table started...');
  const count = await prisma.location.count();
  if (count !== 0) {
    console.log('Location table is not empty. Skipping...');
    return;
  }

  await prisma.location.createMany({ data: locations });
};
