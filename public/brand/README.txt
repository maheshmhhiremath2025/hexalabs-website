Brand files go here.

  logo.png         Full HexaLabs logo (honeycomb + brain icon + wordmark).
                   The header and footer are dark, so use a version whose
                   wordmark is light/white. Export at 2x (e.g. 320 x 72).
  brain-icon.png   Square brain icon, used as the Ask Hexa avatar (e.g. 80 x 80).

After adding them, set ready: true for logo / icon in src/content/site.ts and
update width/height to the real pixel size (halved if you exported at 2x).
Optional: npm run images to create .webp/.avif versions.

Also replace public/favicon.svg and public/apple-touch-icon.png (180 x 180)
with the official mark.
