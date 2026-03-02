import fs from "fs";
import path from "path";
import { getPool } from "../config/db.js";

export const initDatabase = async () => {
  try {
    const schemaPath = path.join(process.cwd(), "src/database/schema.sql");
    const sql = fs.readFileSync(schemaPath, "utf8");

    await getPool().query(sql);

    console.log("Tables initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};