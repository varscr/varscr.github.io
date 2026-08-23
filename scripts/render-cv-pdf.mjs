import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'

const TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
}

// The static export writes /cv as out/cv.html, so resolve extensionless URLs
// the way GitHub Pages does: exact file, then <path>.html, then <path>/index.html.
function resolve(url) {
  const base = join('out', decodeURIComponent(url.split('?')[0]))
  const candidates = [base, `${base}.html`, join(base, 'index.html')]
  return candidates.find((c) => existsSync(c) && statSync(c).isFile())
}

const server = createServer((req, res) => {
  const file = resolve(req.url)
  if (!file) {
    res.writeHead(404).end('not found')
    return
  }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
  res.end(readFileSync(file))
})

await new Promise((resolve) => server.listen(4321, resolve))

const browser = await chromium.launch()
const page = await browser.newPage()
const response = await page.goto('http://localhost:4321/cv', { waitUntil: 'networkidle' })
if (!response || response.status() !== 200) {
  console.error(`FAILED: /cv returned ${response ? response.status() : 'no response'}`)
  process.exit(1)
}
await page.emulateMedia({ media: 'print' })

// Each sheet is a fixed 297mm box with overflow:hidden, so content that does not
// fit is silently clipped — exactly the failure a PDF hides. Measure it instead.
const overflows = await page.evaluate(() =>
  [...document.querySelectorAll('.cv-sheet')].map((sheet, index) => ({
    index: index + 1,
    overflow: sheet.scrollHeight - sheet.clientHeight,
  })),
)
// scrollHeight is clamped to clientHeight, so this detects overflow only — it
// cannot measure how much room is left on a sheet that fits.
for (const sheet of overflows) {
  console.log(`  sheet ${sheet.index}: ${sheet.overflow > 2 ? `OVERFLOWS by ${sheet.overflow}px` : 'fits'}`)
}
const clipped = overflows.filter((sheet) => sheet.overflow > 2)
if (clipped.length) {
  console.error(
    'FAILED: content is clipped —\n' +
      clipped.map((s) => `  - sheet ${s.index} overflows by ${s.overflow}px`).join('\n'),
  )
  await browser.close()
  server.close()
  process.exit(1)
}
await page.pdf({
  path: 'cv.pdf',
  format: 'A4',
  margin: { top: "0", bottom: "0", left: "0", right: "0" },
  printBackground: false,
})

await browser.close()
server.close()

// Playwright writes an uncompressed page tree, so counting /Type /Page is
// reliable here. A 0 means the count is wrong, not the PDF — fail loudly
// rather than let a silent 0 pass the gate.
const pages = readFileSync('cv.pdf').toString('latin1').match(/\/Type\s*\/Page[^s]/g)?.length ?? 0
console.log(`cv.pdf written — ${pages} page(s)`)
if (pages === 0) {
  console.error('FAILED: could not count pages — inspect cv.pdf by hand before trusting it')
  process.exit(1)
}
if (pages > 2) {
  console.error(`FAILED: expected at most 2 pages, got ${pages}`)
  process.exit(1)
}
