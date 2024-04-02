import { PrismaClient } from "@prisma/client";
import { serverSupabaseUser } from "#supabase/server";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const activity = await readBody(event);

    console.log("createStamp", activity);

    const user = await serverSupabaseUser(event);

    const stamp = await prisma.stamps.create({
      data: {
        user: { connect: { id: user.id } },
        type: activity.type,
        activities: { connect: { id: activity.id } },
      },
    });

    if (!stamp) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Profile not found" }),
      };
    }

    // Return the fetched profile
    return {
      statusCode: 200,
      body: JSON.stringify(stamp, (key, value) =>
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
