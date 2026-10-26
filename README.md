# Inkwell Books: Android app

This app is a thin shell around your **hosted** bookstore website, so it has every
feature the site has (shop, cart, checkout, eSewa, account, admin) and updates
automatically whenever you redeploy the website. It never talks to your laptop.

## Step 1: Host the website (required)

The phone app can only work without your laptop if the website itself is online.
Follow `DEPLOYMENT.md` in the main project, or use free services:

- **App:** Render / Railway / Vercel (or any VPS with Docker, as in DEPLOYMENT.md)
- **Database:** MongoDB Atlas (free tier) → set `MONGODB_URI`
- **Images:** Cloudinary → `IMAGE_STORAGE_PROVIDER=cloudinary` (uploaded files on
  free hosts disappear on redeploy; local `uploads/` only works with a persistent disk)
- Set `NEXT_PUBLIC_APP_URL=https://your-site` (must be https), a strong `AUTH_SECRET`,
  SMTP settings, and eSewa credentials (or `ALLOW_SANDBOX_PAYMENTS=true` for testing).
- Create your admin: `npm run create-admin`. Run `npm run seed` only on a test database.

Open the https URL on your phone's browser first. If the site works there, the app will work.

## Step 2: Build the APK without Android Studio or a cable

1. Create a GitHub repository and upload this folder (`inkwell-mobile`) as its contents.
2. Repo → **Settings → Secrets and variables → Actions → Variables → New variable**
   - Name: `APP_URL`   Value: `https://your-site` (no trailing slash)
3. Repo → **Actions → Build Android APK → Run workflow**.
4. When it finishes (~5 min), open the run and download the **inkwell-books-apk** artifact.
5. Unzip, send `app-debug.apk` to your phone (WhatsApp, Drive, email), tap it, and allow
   "Install unknown apps" when asked. It now runs standalone.

## Or build locally (needs Node 20, JDK 17, Android Studio)

```bash
npm install
npx cap add android
APP_URL=https://your-site npx cap sync android
npx cap open android      # then Build → Build APK(s)
```

## Notes

- Needs internet, as the shop is live data. Offline it shows a Retry page.
- The debug APK is fine for personal use and testing. For Google Play you need a
  signed release build (an `.aab`) and a developer account; ask and I'll add it.
- Changing the website URL means rebuilding the APK; changing the website does not.
- Icons/splash use Capacitor defaults. Put a 1024×1024 `assets/icon.png` and run
  `npx @capacitor/assets generate --android` to brand them.
- Android back button navigates back within the site, and exits at the first page.
