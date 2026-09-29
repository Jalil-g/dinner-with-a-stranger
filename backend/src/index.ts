import { PORT } from "./config.js";
import { createApp } from "./app.js";
import { prisma } from "./db.js";

const server = createApp().listen(PORT, () => {
  console.log(`API on http://localhost:${PORT}`);
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    server.close(() => {
      prisma.$disconnect().finally(() => process.exit(0));
    });
  });
}
