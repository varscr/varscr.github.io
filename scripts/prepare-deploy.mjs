import { rmSync } from 'node:fs'
import { globSync } from 'node:fs'

// The CV is deliberately not published. Its source is gitignored and this strips
// anything the local build emitted for it before the site goes to GitHub Pages.
const targets = ['out/cv.html', 'out/cv', ...globSync('out/**/*cv*.txt')]

for (const target of targets) {
  rmSync(target, { recursive: true, force: true })
}
console.log(`prepare-deploy — removed ${targets.length} CV artefact(s) from out/`)
