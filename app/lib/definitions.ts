// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type MaterialsField = {
  id: string;
  name: string;
  unit: string;
  value: number;
};

export type ClientsField = {
  id: number;
  name: string;
};


export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type ProjectView = {
  id: string;
  ref_id: number;
  name: string;
};


//types from DB

export type BudgetsTable = {
  id: number;
  ref_id: string;
  client_id: string;
  name: string;
  totalcost: number;
  status: 'Aprovado' | 'Enviado' | 'Em Andamento' | 'Cancelado';
  date_created: string;
  
};

export type BudgetsTableView = {
  id: number;
  ref_id: string;
  image_url: string;
  client_id: string;
  client_name: string;
  name: string;
  totalcost: number;
  status: 'Aprovado' | 'Enviado' | 'Em Andamento' | 'Cancelado';
  date_created: string;
  
};

export type MaterialsTable = {
  id: number;
  name: string;
  unit: string;
  value: number;
}

export type ClientsTable = {
  id: number;
  name: string;
  cnpj: string;
  email: string;
  image_url: string;
};

export type ProjectsTable = {
  id: number;
  ref_id: number;
  start_date: string;
  end_date: string;
  budget_id: number;
  name: string;
  assigned_to: string;
};

export type ProjectsTableView = {
  id: number;
  ref_id: number;
  name: string;
  assigned_to: string;
  client_id: number
  start_date: string;
  status: 'Aprovado' | 'Enviado' | 'Em Andamento' | 'Cancelado';
  client_name: string;
  image_url: string;
};


export type BudgetMaterialsTable = {
  materials_id: number;
  budgets_id: number;
  name: string;
  quantity: number;
  cost: number;
};

