import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const companiesList = await prisma.companies.findMany({});

    if (!companiesList || companiesList.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Companies list not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(companiesList, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      ),
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
});
