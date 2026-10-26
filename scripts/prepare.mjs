// Writes the website address into www/config.js so the splash screen knows where to go.
import { writeFileSync } from "node:fs";

const url = (process.env.APP_URL ?? "").replace(/\/$/, "");
if (!url) {
  console.error("APP_URL is not set. Example: APP_URL=https://books.example.com");
  process.exit(1);
}
writeFileSync("www/config.js", `window.APP_URL = ${JSON.stringify(url)};\n`);
console.log("Splash will open:", url);
