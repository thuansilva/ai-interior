import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./config/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://interiodb_owner:Wj0BTQKCzFG8@ep-wandering-flower-a5ak0tq5.us-east-2.aws.neon.tech/interiodb?sslmode=require",
  },
});
