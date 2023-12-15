import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const newClient = await prisma.clients.create({
    data: {
      name: 'Client 1',
      cnpj: '12345678901234',
      email: 'client1@example.com',
      image_url: 'http://example.com/image.jpg',
    },
  });


  const newBudget = await prisma.budgets.create({
    data: {
      ref_id: 'REF123',
      client_id: 1, // assuming a client with id 1 exists
      name: 'Budget 1',
      totalcost: 1000.00,
      status: 'INICIADO',
      date_created: new Date(),
    },
  });

  const newMaterial = await prisma.materials.create({
    data: {
      name: 'Material 1',
      unit: 'Kg',
      value: 10.00,
    },
  });

  const newProject = await prisma.projects.create({
    data: {
      ref_id: 'REF123',
      start_date: new Date(),
      end_date: new Date(),
      name: 'Project 1',
      assigned_to: 'John Doe',
    },
  });

  const newBudgetMaterial = await prisma.budgetmaterials.create({
    data: {
      materials_id: 1, // assuming a material with id 1 exists
      budgets_id: newBudget.id,
      name: 'Material 1',
      quantity: 10,
      cost: 100.00,
    },
  });

const newProjectMaterial = await prisma.projectmaterials.create({
  data: {
    materialsid: newMaterial.id,
    projectid: newProject.id,
    materialname: newMaterial.name,
    quantity: 100,
    usedquantity: 50,
    cost: 500.00,
  },
});



}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

