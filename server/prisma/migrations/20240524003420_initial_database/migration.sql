-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" TEXT NOT NULL,
    "month" DATE NOT NULL,
    "qrcode" TEXT NOT NULL,
    "qrcodeKey" TEXT NOT NULL,
    "pdf" TEXT NOT NULL,
    "pdfKey" TEXT NOT NULL,
    "economyGD" INTEGER NOT NULL,
    "totalValueWithoutGD" INTEGER NOT NULL,
    "compensedEnergy" INTEGER NOT NULL,
    "EnergyElectricValue" INTEGER NOT NULL,
    "EnergyElectricKW" INTEGER NOT NULL,
    "ContributionMun" INTEGER NOT NULL,
    "EnergySCEEEValue" INTEGER NOT NULL,
    "EnergySCEEEKW" INTEGER NOT NULL,
    "energyConsume" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "averageEnergyConsume" INTEGER NOT NULL,
    "pix" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_code_key" ON "User"("code");

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
