/* eslint-disable @typescript-eslint/no-misused-promises */
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1) Limpa dados atuais
  await prisma.visit.deleteMany();
  await prisma.museum.deleteMany();

  // 2) Cria museus (fases) de teste
  const museumData = [
    {
      name: 'Museu Histórico do Pará',
      description: 'Acervo sobre a história e cultura paraense.',
      location: 'Belém – Praça Dom Frei Caetano Brandão, s/n',
      phaseNumber: 1,
    },
    {
      name: 'Museu de Arte Sacra',
      description: 'Exposições de arte sacra colonial brasileira.',
      location: 'Belém – Rua do Hambo, 123',
      phaseNumber: 2,
    },
    {
      name: 'Museu da Navegação',
      description: 'História da navegação na Bacia Amazônica.',
      location: 'Belém – Av. Nazaré, 456',
      phaseNumber: 3,
    },
    {
      name: 'Cesupa Direito',
      description:
        'Polo de Direito do Centro Universitário do Pará, sede do Amazon Hacking.',
      location: 'Belém – Av. Alcindo Cacela, 980',
      phaseNumber: 4,
    },
  ];

  const museums = await Promise.all(
    museumData.map((data) => prisma.museum.create({ data })),
  );

  // 3) Localiza o museu “Cesupa Direito”
  const cesupa = museums.find((m) => m.name === 'Cesupa Direito');
  if (!cesupa) throw new Error('Museu Cesupa Direito não encontrado');

  // 4) Cria visitas apenas para o Cesupa
  const visitData = [
    {
      name: 'Daniel Marcelino',
      birthPlace: 'Belém',
      museumId: cesupa.id,
    },
    {
      name: 'André Sidrim',
      birthPlace: 'Fortaleza',
      museumId: cesupa.id,
    },
  ];

  await prisma.visit.createMany({ data: visitData });

  console.log('✅ Seed concluído com Daniel e André no Cesupa!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
