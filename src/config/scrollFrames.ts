/**
 * Frames live in `public/frames/` (served at `/frames/…`). Optional override: put images in
 * `src/assets/frames/` — if that folder has any images, those are bundled instead (restart dev after changes).
 * Naming: `frame_NNN.png` or `frame_NNN_delay-0.066s.png` (NNN = 000, 001, …). Gaps in numbers are OK.
 */

const frameModules = {
  ...import.meta.glob<string>("../assets/frames/**/*.png", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob<string>("../assets/frames/**/*.webp", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob<string>("../assets/frames/**/*.jpg", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob<string>("../assets/frames/**/*.jpeg", {
    eager: true,
    import: "default",
  }),
};

function frameSortKey(path: string): number {
  const m = path.match(/frame_(\d+)/i);
  return m ? parseInt(m[1], 10) : 0;
}

/** Bundled asset URLs (empty if `src/assets/frames` has no images). */
export const frameAssetUrls: string[] = Object.keys(frameModules)
  .sort((a, b) => frameSortKey(a) - frameSortKey(b))
  .map((key) => frameModules[key]);

export const FRAME_COUNT_FROM_ASSETS = frameAssetUrls.length;

export function publicFrameUrl(index: number): string {
  const n = Math.max(0, index);
  const path = `frames/frame_${String(n).padStart(3, "0")}_delay-0.066s.png`;
  const base = import.meta.env.BASE_URL || "/";
  return base.endsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

/** Try common public naming patterns (export sequence tools differ). */
function publicFrameUrlsToTry(index: number): string[] {
  const n = Math.max(0, index);
  const pad = String(n).padStart(3, "0");
  const base = import.meta.env.BASE_URL || "/";
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return [
    `${prefix}frames/frame_${pad}_delay-0.066s.png`,
    `${prefix}frames/frame_${pad}.png`,
  ];
}

function loadImage(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

function compactLoaded(imgs: (HTMLImageElement | undefined)[]): HTMLImageElement[] {
  return imgs.filter(
    (img): img is HTMLImageElement =>
      !!img && img.complete && img.naturalWidth > 0
  );
}

/** Preload known URL list (from Vite glob). */
async function preloadFromAssetUrls(
  urls: string[],
  onProgress: (pct: number) => void
): Promise<HTMLImageElement[]> {
  const imgs: HTMLImageElement[] = new Array(urls.length);
  const batch = 24;
  for (let start = 0; start < urls.length; start += batch) {
    const end = Math.min(start + batch, urls.length);
    await Promise.all(
      Array.from({ length: end - start }, (_, k) => {
        const idx = start + k;
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => {
            imgs[idx] = img;
            resolve();
          };
          img.onerror = () => resolve();
          img.src = urls[idx];
        });
      })
    );
    onProgress(Math.round((end / urls.length) * 100));
  }
  return compactLoaded(imgs);
}

/**
 * Load from `public/frames/` — allows gaps (e.g. 000, 001, 005).
 * After at least one frame has loaded, stops after two consecutive empty batches (end of run).
 * While no frame has loaded yet, empty batches are ignored so a long leading gap (e.g. files
 * starting at frame_064 after deleting 0–63) does not abort the scan early.
 */
async function preloadFromPublicFolder(
  onProgress: (pct: number) => void
): Promise<HTMLImageElement[]> {
  const byIndex = new Map<number, HTMLImageElement>();
  const batchSize = 32;
  let start = 0;
  let emptyBatches = 0;
  const maxProbe = 2000;

  while (emptyBatches < 2 && start < maxProbe) {
    const indices = Array.from({ length: batchSize }, (_, k) => start + k);
    const batch = await Promise.all(
      indices.map(async (i) => {
        for (const url of publicFrameUrlsToTry(i)) {
          const img = await loadImage(url);
          if (img) return img;
        }
        return null;
      })
    );
    let anyInBatch = false;
    for (let i = 0; i < batch.length; i++) {
      if (batch[i]) {
        byIndex.set(indices[i], batch[i]!);
        anyInBatch = true;
      }
    }
    if (!anyInBatch) {
      if (byIndex.size > 0) {
        emptyBatches++;
      }
    } else {
      emptyBatches = 0;
    }
    start += batchSize;
    onProgress(
      byIndex.size > 0 ? Math.min(99, 10 + Math.floor(byIndex.size * 0.2)) : 5
    );
  }

  const sorted = [...byIndex.keys()].sort((a, b) => a - b);
  return sorted.map((k) => byIndex.get(k)!);
}

/** Use bundled frames when present; otherwise `public/frames`. */
export async function loadAllFrameImages(
  onProgress: (pct: number) => void
): Promise<HTMLImageElement[]> {
  if (frameAssetUrls.length > 0) {
    return preloadFromAssetUrls(frameAssetUrls, onProgress);
  }
  return preloadFromPublicFolder(onProgress);
}
