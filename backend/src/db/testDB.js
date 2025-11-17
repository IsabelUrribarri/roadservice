import { PrismaClient } from '@prisma/client';
import "dotenv/config";

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Conexión a Prisma/Postgres exitosa");
  } catch (err) {
    console.error("❌ Error al conectar:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
