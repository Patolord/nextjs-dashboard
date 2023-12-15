-- CreateEnum
CREATE TYPE "BudgetStatus" AS ENUM ('INICIADO', 'ENVIADO', 'APROVADO');

-- CreateTable
CREATE TABLE "budgetmaterials" (
    "materials_id" INTEGER NOT NULL,
    "budgets_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cost" DECIMAL(10,2) NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "budgetmaterials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id" SERIAL NOT NULL,
    "ref_id" VARCHAR(50),
    "client_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "totalcost" DECIMAL(10,2),
    "status" "BudgetStatus" NOT NULL DEFAULT 'INICIADO',
    "date_created" DATE,

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "cnpj" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255),

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "customer_id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materials" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "unit" VARCHAR(50) NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectmaterials" (
    "materialsid" INTEGER NOT NULL,
    "projectid" INTEGER NOT NULL,
    "materialname" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "usedquantity" INTEGER NOT NULL,
    "cost" DECIMAL(10,2) NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "projectmaterials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "ref_id" VARCHAR(50),
    "start_date" DATE,
    "end_date" DATE,
    "budget_id" INTEGER,
    "name" VARCHAR(255),
    "assigned_to" VARCHAR(255),

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revenue" (
    "month" VARCHAR(4) NOT NULL,
    "revenue" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "revenue_month_key" ON "revenue"("month");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "budgetmaterials" ADD CONSTRAINT "budgetmaterials_budgetid_fkey" FOREIGN KEY ("budgets_id") REFERENCES "budgets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "budgetmaterials" ADD CONSTRAINT "budgetmaterials_materialsid_fkey" FOREIGN KEY ("materials_id") REFERENCES "materials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_clientid_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projectmaterials" ADD CONSTRAINT "projectmaterials_materialsid_fkey" FOREIGN KEY ("materialsid") REFERENCES "materials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projectmaterials" ADD CONSTRAINT "projectmaterials_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_budgetid_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

