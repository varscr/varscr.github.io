import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'

// A backup is only a backup if it works with nothing else present. The built
// cv.html links a CSS chunk and the photo out of _next/, so both are inlined
// here and the result is one file that opens and prints anywhere, forever.
const out = process.argv[2]
if (!out) {
  console.error('usage: node scripts/export-cv-standalone.mjs <output.html>')
  process.exit(1)
}
if (!existsSync('out/cv.html')) {
  console.error('out/cv.html missing — run `npm run build` first')
  process.exit(1)
}

let html = readFileSync('out/cv.html', 'utf8')

// 1. Inline every stylesheet.
let styles = 0
let fonts = 0
html = html.replace(/<link[^>]+rel="stylesheet"[^>]*>/g, (tag) => {
  const href = /href="([^"]+)"/.exec(tag)?.[1]
  if (!href) return tag
  const file = join('out', href.split('?')[0].replace(/^\//, ''))
  if (!existsSync(file)) return tag
  styles += 1
  let css = readFileSync(file, 'utf8')
  // @font-face still points into _next/. Without the font the CV falls back to a
  // system sans and every line measure shifts — fatal for a print document.
  // Next writes these relative to the stylesheet (../media/…), not site-absolute,
  // so they must be resolved against the CSS file's own directory.
  css = css.replace(/url\(([^)"']+\.woff2?)\)/g, (m, url) => {
    const fontFile = url.startsWith('/')
      ? join('out', url.replace(/^\//, ''))
      : resolve(dirname(file), url)
    if (!existsSync(fontFile)) return m
    fonts += 1
    const type = url.endsWith('.woff2') ? 'font/woff2' : 'font/woff'
    return `url(data:${type};base64,${readFileSync(fontFile).toString('base64')})`
  })
  return `<style>${css}</style>`
})

// 2. Inline images as data URIs.
const MIME = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png' }
let images = 0
for (const attr of ['src', 'srcSet', 'srcset']) {
  html = html.replace(new RegExp(`${attr}="(/[^"]+\\.(?:webp|jpg|png))"`, 'g'), (m, url) => {
    const file = join('out', url.replace(/^\//, ''))
    if (!existsSync(file)) return m
    const ext = url.slice(url.lastIndexOf('.'))
    images += 1
    return `${attr}="data:${MIME[ext]};base64,${readFileSync(file).toString('base64')}"`
  })
}

// 3. Drop the app's JS. The CV is static content; the only interactive piece is
//    the print button, which is replaced below with one that needs no bundle.
html = html.replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/g, '')
html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '')
html = html.replace(/<link[^>]+rel="(?:preload|prefetch|modulepreload)"[^>]*>/g, '')
html = html.replace(
  /<button[^>]*>Save as PDF<\/button>/,
  '<button type="button" onclick="window.print()" style="border:1px solid rgba(17,17,17,.25);' +
    'border-radius:2px;padding:6px 12px;font:inherit;font-size:.875rem;background:none;cursor:pointer">' +
    'Save as PDF</button>',
)

// Site-relative links are dead when the file is opened from disk.
html = html.replace(/href="\/"/g, 'href="https://varscr.github.io"')

writeFileSync(out, html)
const kb = Math.round(Buffer.byteLength(html) / 1024)
console.log(`${basename(out)} — ${kb}KB, inlined ${styles} stylesheet(s), ${fonts} font(s), ${images} image(s)`)

// A backup with a live dependency is not a backup. Fail loudly rather than
// writing a file that quietly needs the build output next to it.
// Check every url() and src, not just site-absolute ones — the fonts are
// referenced relatively, and a check that only looks for /_next/ passes while
// the file is still broken.
const dangling = [
  ...[...html.matchAll(/url\(([^)"']+)\)/g)].map((m) => m[1]),
  ...[...html.matchAll(/\ssrc="([^"]+)"/g)].map((m) => m[1]),
  ...[...html.matchAll(/\shref="(\/_next[^"]+)"/g)].map((m) => m[1]),
].filter((u) => u && !u.startsWith('data:') && !u.startsWith('#'))
if (dangling.length) {
  console.error(`FAILED: ${dangling.length} unresolved reference(s):`)
  for (const d of [...new Set(dangling)].slice(0, 5)) console.error(`  - ${d}`)
  process.exit(1)
}
console.log('  self-contained — no external references')
