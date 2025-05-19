/* eslint-disable @typescript-eslint/no-misused-promises */
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1) Limpa dados atuais (útil enquanto testa)
  await prisma.visit.deleteMany();
  await prisma.museum.deleteMany();
  await prisma.user.deleteMany();

  // 2) Cria usuários de teste
  const [alice, bob] = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Alice Tester',
        email: 'alice@example.com',
        password: 'password123',
        birthPlace: 'Belém',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Bob Explorer',
        email: 'bob@example.com',
        password: 'secret456',
        birthPlace: 'Salvador',
      },
    }),
  ]);

  // 3) Cria museus (fases) de teste
  const [m1, m2, m3] = await Promise.all([
    prisma.museum.create({
      data: {
        name: 'Museu Histórico do Pará',
        description: 'Acervo sobre a história e cultura paraense.',
        location: 'Belém – Praça Dom Frei Caetano Brandão, s/n',
        phaseNumber: 1,
      },
    }),
    prisma.museum.create({
      data: {
        name: 'Museu de Arte Sacra',
        description: 'Exposições de arte sacra colonial brasileira.',
        location: 'Belém – Rua do Hambo, 123',
        phaseNumber: 2,
      },
    }),
    prisma.museum.create({
      data: {
        name: 'Museu da Navegação',
        description: 'História da navegação na Bacia Amazônica.',
        location: 'Belém – Av. Nazaré, 456',
        phaseNumber: 3,
      },
    }),
  ]);

  // 4) Cria alguns registros de visita
  await prisma.visit.createMany({
    data: [
      { userId: alice.id, museumId: m1.id },
      { userId: alice.id, museumId: m2.id },
      { userId: bob.id, museumId: m3.id },
    ],
  });

  console.log('✅ Seed concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
