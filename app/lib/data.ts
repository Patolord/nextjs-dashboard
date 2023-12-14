import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTable,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  ProjectsTable,
  ClientesTable,
  ProjectView,
  OrcamentosTable,
  ClientsField,
  MateriaisField
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    const data = await sql<Revenue>`SELECT * FROM revenue`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

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
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  noStore();
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTable>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

//Obras
export async function fetchFilteredObras(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const projects = await sql<ProjectsTable>`
      SELECT
        projects.id,
        projects.ref_id,
        projects.name AS project_name,
        projects.status,
        projects.date_of_start,
        projects.date_of_finish,
        projects.assigned_to,
        clients.name AS client_name,
        clients.image_url
      FROM projects
      JOIN clients ON projects.client_id = clients.id
      WHERE
        clients.name ILIKE ${`%${query}%`} OR
        projects.name::text ILIKE ${`%${query}%`} OR
        projects.date_of_start::text ILIKE ${`%${query}%`} OR
        projects.ref_id::text ILIKE ${`%${query}%`} OR
        projects.status ILIKE ${`%${query}%`}
      ORDER BY projects.ref_id DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return projects.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch projects.');
  }
}

export async function fetchObrasPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchObraById(id: string) {
  noStore();
  try {
    const data = await sql<ProjectView>`
      SELECT
        projects.id,
        projects.ref_id,
        projects.name
      FROM projects
      WHERE projects.id = ${id};
    `;

    const project = data.rows.map((project) => ({
      ...project,
    }));

    return project[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch obra.');
  }
}

//Clientes
export async function fetchClientesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM clients    
    WHERE
      clients.name ILIKE ${`%${query}%`} OR
      clients.email ILIKE ${`%${query}%`}    
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of clients.');
  }
}

export async function fetchFilteredClientes(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const clients = await sql<ClientesTable>`
      SELECT
        clients.id,
        clients.name,
        clients.email,
        clients.image_url
      FROM clients 
      WHERE
        clients.name ILIKE ${`%${query}%`} OR
        clients.email::text ILIKE ${`%${query}%`}      
      ORDER BY clients.name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return clients.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch clients.');
  }
}

export async function fetchClientes() {
  noStore();
  try {
    const data = await sql<ClientsField>`
      SELECT
        id,
        name
      FROM clients
      ORDER BY name ASC
    `;

    const clients = data.rows;
    return clients;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all clients.');
  }
}

//Orcamentos
export async function fetchFilteredOrcamentos(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const orcamentos = await sql<OrcamentosTable>`
      SELECT
        orcamentos.id,
        orcamentos.ref_id,
        orcamentos.client_id,
        orcamentos.name AS orcamento_name,
        orcamentos.status,
        clients.name AS client_name,
        clients.image_url
      FROM orcamentos
      JOIN clients ON orcamentos.client_id = clients.id
      WHERE
        clients.name ILIKE ${`%${query}%`} OR
        orcamentos.name::text ILIKE ${`%${query}%`} OR      
        orcamentos.ref_id::text ILIKE ${`%${query}%`} OR
        orcamentos.status ILIKE ${`%${query}%`}
      ORDER BY orcamentos.ref_id DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return orcamentos.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch orcamentos.');
  }
}

export async function fetchOrcamentosPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM orcamentos
    JOIN clients ON orcamentos.client_id = clients.id
    WHERE
      orcamentos.ref_id ILIKE ${`%${query}%`} OR
      orcamentos.status ILIKE ${`%${query}%`} OR
      clients.name::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of orcamentos.');
  }
}

export async function fetchOrcamentoById(id: string) {
  noStore();
  try {
    const data = await sql<OrcamentosTable>`
      SELECT
        orcamentos.id,
        orcamentos.ref_id,
        orcamentos.name
      FROM orcamentos
      WHERE orcamentos.id = ${id};
    `;

    const orcamento = data.rows.map((orcamento) => ({
      ...orcamento,
    }));

    return orcamento[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch obra.');
  }
}


//materiais
export async function fetchMateriais() {
  noStore();
  try {
    const data = await sql<MateriaisField>`
      SELECT
        id,
        name,
        unit,
        value
      FROM materiais
      ORDER BY id ASC
    `;

    const materiais = data.rows;
    return materiais;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all materiais.');
  }
}