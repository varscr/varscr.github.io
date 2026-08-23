import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'

const PORT = Number(process.env.PORT ?? 4173)
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
}

// Resolve the way GitHub Pages does, so what you see here is what ships:
// exact file, then <path>.html, then <path>/index.html.
function resolve(url) {
  const base = join('out', decodeURIComponent(url.split('?')[0]))
  return [base, `${base}.html`, join(base, 'index.html')].find(
    (candidate) => existsSync(candidate) && statSync(candidate).isFile(),
  )
}

createServer((req, res) => {
  const file = resolve(req.url)
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain' }).end('404')
    return
  }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
  res.end(readFileSync(file))
}).listen(PORT, () => {
  console.log(`serving out/ on http://localhost:${PORT}`)
  console.log(`  home  http://localhost:${PORT}/`)
  console.log(`  cv    http://localhost:${PORT}/cv`)
})
