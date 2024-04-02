import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createActivities(activities) {
  try {
    const createdActivities = [];
    for (const activity of activities) {
      const { name, color, icon, ...rest } = activity; // Destructure activity properties

      const createdActivity = await prisma.activities.upsert({
        where: { name: name.toLowerCase() }, // Use lowercase name for where clause
        create: {
          usersId: "874fa3be-fdfb-4e4e-baa3-29550e8e7f87",
          color,
          name: name.toLowerCase(), // Ensure name is lowercase in the database
          icon,
          ...rest, // Spread the remaining properties
        },
        update: {},
      });

      createdActivities.push(createdActivity);
      console.log(`Created activity: ${createdActivity.name}`);
    }

    return createdActivities; // Optionally return the created activities
  } catch (error) {
    console.error("Error creating activities:", error);
  } finally {
    await prisma.$disconnect();
  }
}

const activitiesData = [
  {
    color: "#4e42f5",
    name: "Sleep",
    icon: "🌙",
    pointsPerHour: 0,
    secondsFree: 0,
  },
  {
    color: "#FFA500",
    name: "Work",
    icon: "🔨",
    pointsPerHour: 0,
    secondsFree: 0,
  },
  {
    color: "#FFC0CB",
    name: "Rest",
    icon: "🍹",
    pointsPerHour: 0,
    secondsFree: 0,
  },
  {
    color: "#ADD8E6",
    name: "Eat",
    icon: "🥩",
    pointsPerHour: 0,
    secondsFree: 0,
  },
  {
    color: "#FF0000",
    name: "Inst Grat",
    icon: "💊",
    pointsPerHour: 0,
    secondsFree: 0,
  },
  {
    color: "#FFFF00",
    name: "Antientropy",
    icon: "🧹",
    pointsPerHour: 0,
    secondsFree: 0,
  },
  {
    color: "#90EE90",
    name: "Study",
    icon: "📚",
    pointsPerHour: 0,
    secondsFree: 0,
  },
  {
    color: "#800080",
    name: "Projects",
    icon: "💡",
    pointsPerHour: 0,
    secondsFree: 0,
  },
  {
    color: "#40E0D0",
    name: "Exercise",
    icon: "🏋️‍♂️",
    pointsPerHour: 0,
    secondsFree: 0,
  },
];

(async () => {
  const results = await createActivities(activitiesData);
  console.log("Created activities:", results); // Example usage to see all created activities
})();
