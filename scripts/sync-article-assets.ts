/**
 * Copies canonical article-data outputs into public/ and src/.../charts/
 * so Create React App can bundle JSON and static hosting can serve CSV/GeoJSON.
 *
 * Source of truth: article-data/. Generated paths are gitignored; run via
 * prestart / pretest / prebuild or: npm run sync:article-assets
 */
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');

type BundledMapping = { from: string; to: string };

const BUNDLED: BundledMapping[] = [
  {
    from: 'article-data/baby-names/outputs/bundled',
    to: 'src/components/articles/baby_names/charts',
  },
  {
    from: 'article-data/gender-equality/outputs/bundled',
    to: 'src/components/articles/women-in-netflix/charts',
  },
  {
    from: 'article-data/ageismo-femminicidi/outputs/bundled',
    to: 'src/components/articles/vittime-anziane-femminicidio/charts',
  },
  {
    from: 'article-data/greeenery-in-silicon-valley-schools',
    to: 'src/components/articles/greenery-in-silicon-valley-schools/charts',
  },
];

const PUBLIC_FILES: { from: string; to: string }[] = [
  {
    from: 'article-data/baby-names/data/spelling_variation_timeseries.csv',
    to: 'public/data/articles/baby-names/spelling_variation_timeseries.csv',
  },
  {
    from: 'article-data/is-italy-a-representative-democracy/outputs/public/it.json',
    to: 'public/data/articles/is-italy-a-representative-democracy/it.json',
  },
  {
    from: 'article-data/is-italy-a-representative-democracy/outputs/public/region_comparison_analysis.csv',
    to: 'public/data/articles/is-italy-a-representative-democracy/region_comparison_analysis.csv',
  },
];

function copyDirJson(fromDir: string, toDir: string) {
  const absFrom = path.join(ROOT, fromDir);
  const absTo = path.join(ROOT, toDir);
  if (!fs.existsSync(absFrom)) {
    console.warn(`sync-article-assets: skip missing ${fromDir}`);
    return;
  }
  fs.mkdirSync(absTo, { recursive: true });
  for (const name of fs.readdirSync(absFrom)) {
    if (!name.endsWith('.json')) continue;
    fs.copyFileSync(path.join(absFrom, name), path.join(absTo, name));
  }
}

function copyPublicFile(from: string, to: string) {
  const absFrom = path.join(ROOT, from);
  const absTo = path.join(ROOT, to);
  if (!fs.existsSync(absFrom)) {
    throw new Error(`sync-article-assets: missing source ${from}`);
  }
  fs.mkdirSync(path.dirname(absTo), { recursive: true });
  fs.copyFileSync(absFrom, absTo);
}

function main() {
  for (const { from, to } of BUNDLED) {
    copyDirJson(from, to);
  }
  for (const { from, to } of PUBLIC_FILES) {
    copyPublicFile(from, to);
  }
  console.log('sync-article-assets: done');
}

main();
