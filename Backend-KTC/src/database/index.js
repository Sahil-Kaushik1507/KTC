import { initDatabase } from "./initTables.js";
import { seedDatabase } from "./seed.js";

export const setupDatabase = async () => {
  try {
    await initDatabase();

    if (process.env.NODE_ENV !== "production") {
      await seedDatabase();
    }

    console.log("Database setup completed");
  } catch (error) {
    console.error("Database setup failed:", error);
    process.exit(1);
  }
};
