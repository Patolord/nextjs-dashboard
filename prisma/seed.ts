import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

 // Seeding multiple Clients
 const clients = [
    { name: 'Tegra Incorporadora', cnpj: '12345678901234' },
    { name: 'Construcompany', cnpj: '23456789012345' },
    { name: 'Rocontec', cnpj: '23456789012345' },
    { name: 'Construtora Duo', cnpj: '23456789012345' },
    // Add more clients as needed
  ];
  for (const client of clients) {
    await prisma.client.create({ data: client });
  }

  // Seeding multiple Projects
  const projects = [
    { name: 'Tegra Mooca', client_id: 1,ref_id: 1550, start_date: new Date(), end_date: new Date(), status: 'In Progress' },
    { name: 'Afonso Mariano Infra', client_id: 2, ref_id: 1551,start_date: new Date(), end_date: new Date(), status: 'Completed' },
    { name: 'Afonso Mariano AC', client_id: 2, ref_id: 1552,start_date: new Date(), end_date: new Date(), status: 'Completed' },
    { name: 'Afonso Mariano Press', client_id: 2, ref_id: 1553,start_date: new Date(), end_date: new Date(), status: 'Completed' },
    { name: 'Match Pamplona', client_id: 3, ref_id: 1554,start_date: new Date(), end_date: new Date(), status: 'Completed' },
    // Add more projects as needed
  ];
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

 // Seeding multiple Quotes
 const quotes = [
    { name: 'Tegra Mooca', client_id: 1, ref_id: 35, estimated_cost: 10000, start_date: new Date(), status: 'Draft' },
    { name: 'Afonso Mariano Infra', client_id: 2, ref_id: 36, estimated_cost: 15000, start_date: new Date(), status: 'Approved' },
    { name: 'Afonso Mariano AC', client_id: 2, ref_id: 37, estimated_cost: 25000, start_date: new Date(), status: 'Approved' },
    { name: 'Afonso Mariano Press', client_id: 2, ref_id: 38, estimated_cost: 13000, start_date: new Date(), status: 'Approved' },
    { name: 'Match Pamplona', client_id: 3, ref_id: 39, estimated_cost: 17000, start_date: new Date(), status: 'Approved' },
    { name: 'Construtora Duo', client_id: 4, ref_id: 40, estimated_cost: 12000, start_date: new Date(), status: 'Draft' },
    // Add more quotes as needed
  ];
  for (const quote of quotes) {
    await prisma.quote.create({ data: quote });
  }

 // Seeding multiple Materials
const materials = [
    { name: 'Steel Beam', description: 'Standard steel beam', unit: 'Piece', category: 'Construction' },
    { name: 'Concrete', description: 'High-quality concrete', unit: 'Ton', category: 'Construction' },
    { name: 'Copper Wire', description: 'High-grade copper wire', unit: 'Meter', category: 'Electrical' },
    { name: 'PVC Pipe', description: 'Durable PVC piping', unit: 'Meter', category: 'Plumbing' },
    { name: 'Aluminum Sheets', description: 'Lightweight aluminum sheets', unit: 'Sheet', category: 'Construction' },
    { name: 'Plywood', description: 'Multipurpose plywood', unit: 'Sheet', category: 'Carpentry' },
    { name: 'Paint', description: 'White wall paint', unit: 'Gallon', category: 'Painting' },
    { name: 'Bricks', description: 'Red clay bricks', unit: 'Piece', category: 'Masonry' },
    { name: 'Insulation Foam', description: 'Thermal insulation foam', unit: 'Roll', category: 'Insulation' },
    { name: 'Ceramic Tiles', description: 'Glazed ceramic floor tiles', unit: 'Square Meter', category: 'Flooring' },
    { name: 'LED Light Bulbs', description: 'Energy-efficient LED bulbs', unit: 'Piece', category: 'Electrical' }
  ];
  for (const material of materials) {
    await prisma.material.create({ data: material });
  }
  

// Seeding multiple Suppliers
  const suppliers = [
    { name: 'Steel Supplies Inc.', contact_info: 'contact@steelsuppliesinc.com' },
    { name: 'Concrete Co.', contact_info: 'sales@concreteco.com' },
    // Add more suppliers as needed
  ];
  for (const supplier of suppliers) {
    await prisma.supplier.create({ data: supplier });
  }

  // Seeding Contracts
  const contracts = [
    { client_id: 1, project_id: 1, quote_id: 1, ref_id: 1000, name: 'Contract 1', contract_value: 20000, start_date: new Date(), end_date: new Date(), status: 'Active' },
    { client_id: 2, project_id: 2, quote_id: 2, ref_id: 1001, name: 'Contract 2', contract_value: 25000, start_date: new Date(), end_date: new Date(), status: 'Completed' },
    { client_id: 2, project_id: 2, quote_id: 3, ref_id: 1002, name: 'Contract 3', contract_value: 35000, start_date: new Date(), end_date: new Date(), status: 'Completed' },
    { client_id: 2, project_id: 2, quote_id: 4, ref_id: 1003, name: 'Contract 4', contract_value: 27000, start_date: new Date(), end_date: new Date(), status: 'Completed' },
    { client_id: 3, project_id: 3, quote_id: 5, ref_id: 1004, name: 'Contract 5', contract_value: 22000, start_date: new Date(), end_date: new Date(), status: 'Completed' },
    // Add more contracts as needed
  ];
  for (const contract of contracts) {
    await prisma.contract.create({ data: contract });
  }

  // Seeding Prices
  const prices = [
    { material_id: 1, supplier_id: 1, price: 100.50, effective_date: new Date() },
    { material_id: 2, supplier_id: 2, price: 150.75, effective_date: new Date() },
    { material_id: 3, supplier_id: 1, price: 120.00, effective_date: new Date() },
    { material_id: 4, supplier_id: 2, price: 80.25, effective_date: new Date() },
    { material_id: 5, supplier_id: 1, price: 200.40, effective_date: new Date() },
    { material_id: 1, supplier_id: 3, price: 105.00, effective_date: new Date() },
    { material_id: 2, supplier_id: 3, price: 155.50, effective_date: new Date() },
    { material_id: 3, supplier_id: 2, price: 115.75, effective_date: new Date() },
    { material_id: 4, supplier_id: 3, price: 90.10, effective_date: new Date() },
    { material_id: 5, supplier_id: 2, price: 210.30, effective_date: new Date() }
  ];
  for (const price of prices) {
    await prisma.price.create({ data: price });
  }
  

  // Seeding Quote_Materials
  const quoteMaterials = [
    { quote_id: 1, material_id: 1, quantity: 10, price_id: 1 },
    { quote_id: 2, material_id: 2, quantity: 20, price_id: 2 },
    // Add more quote materials as needed
  ];
  for (const qm of quoteMaterials) {
    await prisma.quote_Material.create({ data: qm });
  }

  // Seeding Project_Materials
  const projectMaterials = [
    { project_id: 1, material_id: 1, quantity: 5, price_id: 1 },
    { project_id: 2, material_id: 2, quantity: 15, price_id: 2 },
    // Add more project materials as needed
  ];
  for (const pm of projectMaterials) {
    await prisma.project_Material.create({ data: pm });
  }

  // Sample data seeding for User
  const passwordHash = await bcrypt.hash('securepassword', 10);
  const user = await prisma.user.create({
    data: {
      name: 'Rodrigo',
      email: 'user@nextmail.com',
      password: passwordHash, // Storing the hashed password
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