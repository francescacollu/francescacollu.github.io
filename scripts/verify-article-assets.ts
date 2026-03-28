/**
 * Ensures static paths referenced by the app exist under public/ (pre-deploy check).
 */
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');

/** URL paths (leading slash) that must exist as files under public/ */
const REQUIRED_PUBLIC_URLS = [
  '/data/articles/baby-names/spelling_variation_timeseries.csv',
  '/data/articles/is-italy-a-representative-democracy/it.json',
  '/data/articles/is-italy-a-representative-democracy/region_comparison_analysis.csv',
  '/content/BabyNames/section1.md',
  '/content/WomenInNetflix/section1.md',
  '/content/ItalianParliamentGap/intro.md',
  '/content/VittimeAnzianeFemminicidio/section1.md',
  '/images/articles/greenery-sv-schools/lexington-satellite.webp',
  '/images/articles/greenery-sv-schools/rfk-satellite.webp',
];

function main() {
  let failed = false;
  for (const urlPath of REQUIRED_PUBLIC_URLS) {
    const rel = urlPath.replace(/^\//, '');
    const abs = path.join(ROOT, 'public', rel);
    if (!fs.existsSync(abs)) {
      console.error(`verify-article-assets: missing ${rel}`);
      failed = true;
    }
  }
  if (failed) {
    process.exit(1);
  }
  console.log('verify-article-assets: ok');
}

main();
