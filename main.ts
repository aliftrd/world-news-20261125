// Entrypoint for news-image-20261125 (Node 22, standard library only).
// Copies the verified 1024x1024 world news summary image into MAKEFUN_OUTPUT_DIR/entry.png.

import { chmodSync, copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MAX_IMAGE_BYTES = 1048576;
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

const destPath = join(outDir, 'entry.png');
copyFileSync(new URL('./entry.png', import.meta.url), destPath);

const writtenSize = statSync(destPath).size;
if (writtenSize === 0 || writtenSize > MAX_IMAGE_BYTES) {
  throw new Error(`Invalid entry.png size: ${writtenSize} bytes`);
}

try {
  chmodSync(destPath, 0o644);
} catch {
  // Ignore if filesystem ownership prevents chmod.
}
