import { readFileSync, existsSync } from 'node:fs'

// Next 16 static export writes out/index.html and out/cv.html; GitHub Pages
// resolves the extensionless /cv to cv.html.
const PAGES = ['out/index.html', 'out/cv.html']
const REQUIRED = ['Independent Contractor', 'Janover', 'Teleperformance', 'PBS Group', 'Udacity', 'SENA']
const EXCLUDED = ['San Luis', 'Fátima', 'Fatima', 'Robin', 'Foundever', 'Monitor and Instructor', 'robotics']
const failures = []

for (const page of PAGES) {
  if (!existsSync(page)) {
    failures.push(`missing: ${page}`)
    continue
  }
  const html = readFileSync(page, 'utf8')
  for (const term of REQUIRED) {
    if (!html.includes(term)) failures.push(`${page}: missing "${term}"`)
  }
  for (const term of EXCLUDED) {
    if (html.includes(term)) failures.push(`${page}: leaked "${term}"`)
  }
  if (html.includes('vargassanchezfabio01')) failures.push(`${page}: leaked personal email`)
  if (!html.includes('fhvargas.work@gmail.com')) failures.push(`${page}: missing work email`)
}

if (failures.length) {
  console.error('check-build FAILED\n' + failures.map((f) => `  - ${f}`).join('\n'))
  process.exit(1)
}
console.log(`check-build passed — ${PAGES.length} pages, ${REQUIRED.length} orgs present`)
