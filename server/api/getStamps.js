import { PrismaClient } from "@prisma/client";

import { serverSupabaseUser } from "#supabase/server";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const user = await serverSupabaseUser(event);

    const activitiesList = await prisma.stamps.findMany({
      where: {
        usersId: user.id,
      },
    });

    if (!activitiesList || activitiesList.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "activities list not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(activitiesList, (key, value) =>
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
