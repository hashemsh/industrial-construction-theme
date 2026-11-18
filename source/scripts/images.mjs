import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const CACHE_DIR = path.resolve('../.cache/photos');
const OUT_DIR = path.resolve('../release/assets/images');
const ICON_DIR = path.resolve('../release/assets/images');

// Pexels photos, Pexels license: free for commercial use, no attribution required.
const photos = [
  { id: 5505125, name: 'hero-industrial', ratio: 16 / 9, widths: [960, 1920], webpQuality: 46 },
  { id: 18078304, name: 'hero-slide-2', ratio: 16 / 9, widths: [960, 1920], webpQuality: 46 },
  {
    id: 33369528,
    name: 'hero-slide-3',
    ratio: 16 / 9,
    widths: [960, 1920],
    avifQuality: 38,
    webpQuality: 44,
  },
  { id: 8961006, name: 'about-team', ratio: 4 / 5, widths: [520, 900] },
  { id: 33369528, name: 'service-plant', ratio: 4 / 3, widths: [560, 900] },
  { id: 10697106, name: 'service-warehouse', ratio: 4 / 3, widths: [560, 900] },
  { id: 18078304, name: 'service-infrastructure', ratio: 4 / 3, widths: [560, 900] },
  { id: 5504388, name: 'project-crane', ratio: 4 / 5, widths: [480, 760] },
  { id: 36700973, name: 'project-city', ratio: 4 / 5, widths: [480, 760] },
  { id: 3818947, name: 'project-steel', ratio: 4 / 5, widths: [480, 760] },
  { id: 34254278, name: 'project-facade', ratio: 4 / 5, widths: [480, 760] },
  { id: 34718926, name: 'project-plant', ratio: 4 / 5, widths: [480, 760] },
  { id: 34190679, name: 'project-coastal', ratio: 4 / 5, widths: [480, 760] },
  { id: 34629416, name: 'video-poster', ratio: 16 / 9, widths: [960, 1600] },
  { id: 8960987, name: 'team-one', ratio: 1 / 1.12, widths: [420, 640] },
  { id: 32845694, name: 'team-two', ratio: 1 / 1.12, widths: [420, 640] },
  { id: 8961008, name: 'team-three', ratio: 1 / 1.12, widths: [420, 640] },
  { id: 34207364, name: 'faq-site', ratio: 1, widths: [520, 820] },
  { id: 10039994, name: 'blog-machinery', ratio: 4 / 3, widths: [520, 800] },
  { id: 10064817, name: 'blog-crane', ratio: 4 / 3, widths: [520, 800] },
  { id: 28261139, name: 'blog-bridge', ratio: 4 / 3, widths: [520, 800] },
  { id: 34190681, name: 'project-jetty', ratio: 4 / 5, widths: [480, 760] },
];

const download = async (photo) => {
  const file = path.join(CACHE_DIR, `${photo.name}.jpg`);
  try {
    await fs.access(file);
    return file;
  } catch {
    const url = `https://images.pexels.com/photos/${photo.id}/pexels-photo-${photo.id}.jpeg?auto=compress&cs=tinysrgb&w=2000`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Download failed ${photo.id}: ${response.status}`);
    await fs.writeFile(file, Buffer.from(await response.arrayBuffer()));
    return file;
  }
};

const generate = async (photo) => {
  const file = await download(photo);
  for (const width of photo.widths) {
    const height = Math.round(width / photo.ratio);
    const base = sharp(file).resize({ width, height, fit: 'cover', position: 'centre' });

    await base
      .clone()
      .avif({ quality: photo.avifQuality ?? 52, effort: 5 })
      .toFile(path.join(OUT_DIR, `${photo.name}-${width}.avif`));
    await base
      .clone()
      .webp({ quality: photo.webpQuality ?? 68, effort: 5 })
      .toFile(path.join(OUT_DIR, `${photo.name}-${width}.webp`));
  }
};

const brandMark = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <rect width="48" height="48" fill="#1b2023"/>
  <path d="M9 27 24 12l15 15" fill="none" stroke="#2b6c88" stroke-width="3.5" stroke-linecap="square"/>
  <path d="M15 27v11M24 27v11M33 27v11" stroke="#f6f2ec" stroke-width="2.5"/>
</svg>`;

const buildIcons = async () => {
  await sharp(Buffer.from(brandMark)).resize(180, 180).png().toFile(path.join(ICON_DIR, 'apple-touch-icon.png'));
};

const buildOgImage = async () => {
  const hero = path.join(CACHE_DIR, 'hero-industrial.jpg');
  await sharp(hero)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .composite([
      {
        input: Buffer.from(
          '<svg width="1200" height="630"><rect width="1200" height="630" fill="#121618" opacity="0.62"/></svg>',
        ),
      },
    ])
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(OUT_DIR, 'og-image.jpg'));
};

await fs.mkdir(CACHE_DIR, { recursive: true });
await fs.mkdir(OUT_DIR, { recursive: true });

for (const photo of photos) {
  process.stdout.write(`· ${photo.name}\n`);
  await generate(photo);
}

await buildIcons();
await buildOgImage();
process.stdout.write('done\n');
