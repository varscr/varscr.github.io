import { readFileSync, existsSync } from 'node:fs'

const deployMode = process.argv.includes('--deploy')

// What the public portfolio must say.
const PORTFOLIO_REQUIRED = ['Fabio Vargas', 'NeuralSeek', 'TechD', 'Burrito', 'Manasara', 'fhvargas.work@gmail.com']
// What the CV must say, when it has been built locally.
const CV_REQUIRED = ['NeuralSeek', 'TechD', 'Independent Contractor', 'Janover', 'Teleperformance', 'Infotrans', 'Udacity', 'SENA']
const EXCLUDED = ['San Luis', 'Fátima', 'Fatima', 'Robin', 'Foundever', 'Monitor and Instructor', 'robotics', 'PBS']

const failures = []

function check(page, required) {
  const html = readFileSync(page, 'utf8')
  for (const term of required) {
    if (!html.includes(term)) failures.push(`${page}: missing "${term}"`)
  }
  for (const term of EXCLUDED) {
    if (html.includes(term)) failures.push(`${page}: leaked "${term}"`)
  }
  if (html.includes('vargassanchezfabio01')) failures.push(`${page}: leaked personal email`)
  // Career/Positioning.md: Azure OpenAI is not one of his skills. The data tests
  // cover lib/data.ts; this catches it anywhere else, including metadata.
  if (/Azure/i.test(html)) failures.push(`${page}: claims Azure — see the guardrails in Career/Positioning.md`)
}

if (!existsSync('out/index.html')) {
  failures.push('missing: out/index.html')
} else {
  check('out/index.html', PORTFOLIO_REQUIRED)
}

if (deployMode) {
  // The CV must never reach GitHub Pages.
  for (const artefact of ['out/cv.html', 'out/cv']) {
    if (existsSync(artefact)) failures.push(`${artefact} would be published — the CV must stay local`)
  }
} else if (existsSync('out/cv.html')) {
  check('out/cv.html', CV_REQUIRED)
}

if (failures.length) {
  console.error('check-build FAILED\n' + failures.map((f) => `  - ${f}`).join('\n'))
  process.exit(1)
}
console.log(deployMode ? 'check-build passed — portfolio only, no CV in out/' : 'check-build passed — portfolio and local CV')
