import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const directory = resolve(process.argv[2] || 'dist');
const base = `/${(process.env.BASE_PATH || '').replace(/^\/+|\/+$/g, '')}`.replace(/\/?$/, '/');
const origin = new URL(process.env.SITE_URL || 'https://build.example').origin;

assert(existsSync(join(directory, 'index.html')), `Build not found: ${directory}`);

function filesIn(path) {
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const file = join(path, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  });
}

function decode(value) {
  return value.replace(/&#(x[\da-f]+|\d+);|&(amp|quot|apos);/gi, (_, number, name) => {
    if (number) return String.fromCodePoint(number[0].toLowerCase() === 'x' ? parseInt(number.slice(1), 16) : Number(number));
    return { amp: '&', quot: '"', apos: "'" }[name.toLowerCase()];
  });
}

const files = filesIn(directory);
const html = files.filter((file) => file.endsWith('.html'));
const anchors = new Map(html.map((file) => [file, new Set([...readFileSync(file, 'utf8').matchAll(/\bid="([^"]+)"/g)].map((match) => decode(match[1])))]));
let checked = 0;

function checkReference(reference, current, source) {
  if (!reference || reference.startsWith('data:')) return;
  const url = new URL(decode(reference), current);
  if (url.origin !== origin) return;
  assert(url.pathname.startsWith(base), `${source}: URL escapes BASE_PATH: ${reference}`);
  let target = resolve(directory, decodeURIComponent(url.pathname.slice(base.length)));
  assert(existsSync(target), `${source}: missing file for ${reference}`);
  if (statSync(target).isDirectory()) target = join(target, 'index.html');
  assert(existsSync(target), `${source}: missing page for ${reference}`);
  if (url.hash && anchors.has(target)) {
    assert(anchors.get(target).has(decodeURIComponent(url.hash.slice(1))), `${source}: missing anchor for ${reference}`);
  }
  checked++;
}

for (const file of files.filter((item) => /\.(html|css|xml)$/.test(item))) {
  const name = relative(directory, file).replaceAll('\\', '/');
  const current = new URL(`${base}${name.replace(/index\.html$/, '')}`, origin);
  const text = readFileSync(file, 'utf8');
  const references = [];

  if (file.endsWith('.html')) {
    references.push(...[...text.matchAll(/\b(?:href|src|component-url|renderer-url)="([^"]+)"/g)].map((match) => match[1]));
    for (const [, srcset] of text.matchAll(/\bsrcset="([^"]+)"/g)) {
      references.push(...srcset.split(',').map((candidate) => candidate.trim().split(/\s+/)[0]));
    }
    for (const [, tag] of text.matchAll(/<(meta\s[^>]+)>/g)) {
      if (/property="og:(image|url)"/.test(tag)) {
        const content = tag.match(/content="([^"]+)"/);
        if (content) references.push(content[1]);
      }
    }
  }

  references.push(...[...decode(text).matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)].map((match) => match[1]));
  references.push(...[...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
  for (const reference of references) checkReference(reference, current, name);
}

console.log(`Build check passed: ${html.length} HTML pages, ${checked} local references; BASE_PATH=${base}`);
