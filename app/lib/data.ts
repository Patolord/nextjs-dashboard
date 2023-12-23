import { User } from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/*
export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
} */

const ITEMS_PER_PAGE = 6;
export async function getUser(email: string) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    return user as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

//Obras
export async function fetchFilteredProjects(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const projects = await prisma.projects.findMany({
      select: {
        id: true,
        name: true,
        ref_id: true,
        start_date: true,
        end_date: true,
        status: true,
        Client: {
          select: { name: true, image_url: true },
        },
      },
      where: {
        name: {
          contains: query,
        },
      },
      orderBy: {
        ref_id: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return projects.map((project) => ({
      ...project,
      client_name: project.Client?.name, // Adds client name to each quote
      image_url: project.Client?.image_url, // Adds client name to each quote
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch projects.');
  }
}

export async function fetchProjectById(id: number) {
  noStore();
  try {
    const project = await prisma.projects.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        ref_id: true,
        name: true,
      },
    });

    return project;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch obra.');
  }
}

//Clientes
export async function fetchFilteredClients(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const clients = await prisma.clients.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              // mode: 'insensitive' can be added if your Prisma version supports it
            },
          },
          {
            cnpj: {
              contains: query,
              // mode: 'insensitive' can be added if your Prisma version supports it
            },
          },
        ],
      },
      orderBy: {
        name: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
      select: {
        id: true,
        name: true,
        cnpj: true,
        image_url: true, // Replace 'imageUrl' with the actual field name in your Client model
      },
    });

    return clients;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch clients.');
  }
}

export async function fetchClients() {
  noStore();
  try {
    const clients = await prisma.clients.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return clients;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all clients.');
  }
}

//Orcamentos
export async function fetchFilteredQuotes(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const quotes = await prisma.quotes.findMany({
      select: {
        id: true,
        ref_id: true,
        client_id: true,
        name: true,
        status: true,
        Client: {
          select: { name: true, image_url: true },
        },
      },
      where: {
        name: {
          contains: query,
        },
      },
      orderBy: {
        ref_id: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return quotes.map((quote) => ({
      ...quote,
      client_name: quote.Client?.name, // Adds client name to each quote
      client_url: quote.Client?.image_url, // Adds client name to each quote
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch quotes.');
  }
}

export async function fetchQuoteById(id: number) {
  noStore();
  try {
    const quote = await prisma.quotes.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        ref_id: true,
        name: true,
        estimated_cost: true,
        Client: {
          select: { name: true, image_url: true },
        },
        start_date: true,
        status: true,
        quote_materials: {
          select: {
            material_id: true,
            quantity: true,
            price_id: true,
            Material: {
              select: {
                name: true,
              },
            },
            Price: {
              select: {
                price: true,
              },
            },
          },
        },
        
      },
    });

    return quote;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch quote.');
  }
}

export async function fetchProjectsPages(query: string) {
  noStore();
  try {
    const count = await prisma.projects.count({
      where: {
        name: {
          contains: query,
        },
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchQuotesPages(query: string) {
  noStore();
  try {
    const count = await prisma.quotes.count({
      where: {
        name: {
          contains: query,
        },
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of budgets.');
  }
}

export async function fetchClientsPages(query: string) {
  noStore();
  try {
    const count = await prisma.clients.count({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            cnpj: {
              contains: query,
            },
          },
        ],
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of client pages.');
  }
}
//materiais
export async function fetchMaterials() {
  noStore();
  try {
    const materiais = await prisma.materials.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    return materiais;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all materiais.');
  }
}
