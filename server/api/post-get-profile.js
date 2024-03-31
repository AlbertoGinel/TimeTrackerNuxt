import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const profile = await prisma.profiles.findUnique({
      where: {
        id: body.id,
      },
      include: {
        companies: true,
      },
    });

    if (!profile) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Profile not found" }),
      };
    }

    // Return the fetched profile
    return {
      statusCode: 200,
      body: JSON.stringify(profile, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      ),
    };
  } catch (error) {
    console.error("Error occurred:", error); // Use console.error for better visibility
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
});
