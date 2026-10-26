import type { CapacitorConfig } from "@capacitor/cli";

// The URL of your HOSTED website (must be reachable from the internet).
const APP_URL = (process.env.APP_URL ?? "").replace(/\/$/, "");

if (!APP_URL) {
  throw new Error("APP_URL is not set. Example: APP_URL=https://books.example.com");
}

const host = new URL(APP_URL).host;

const config: CapacitorConfig = {
  appId: "com.inkwell.bookstore",
  appName: "BooksOnline",
  // www/index.html is the animated splash. It opens APP_URL when ready.
  webDir: "www",
  backgroundColor: "#1b5e3b",
  server: {
    cleartext: APP_URL.startsWith("http://"), // https is strongly recommended
    // Keep these inside the app. Without this, the eSewa payment page would
    // open in the phone's browser and the customer would never return to the app.
    allowNavigation: [host, "*.esewa.com.np", "esewa.com.np", "res.cloudinary.com"],
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
