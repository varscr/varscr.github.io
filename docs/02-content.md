# Content

All career text lives in `lib/data.ts`. Nothing else contains it.

## Exports

| Export | Used by | Notes |
|---|---|---|
| `profile` | both | name, role, keywords, photo, `lead`, `now`, email, links |
| `roles` | both | reverse chronological; `summary` for the portfolio, `bullets` for the CV |
| `projects` | both | portfolio shows the first bullet, CV shows all |
| `about` | CV | the longer, formal ABOUT block |
| `education`, `certifications`, `references`, `spokenLanguages`, `stack` | CV | |
| `earlierCareer` | CV | the condensed design-years line |

## Honesty guardrails — read before editing

`personal-obsidian-vault/Career/` is the source of truth and sets rules this
repo must not break:

- **Burrito** — Fabio *contributed to* it as a team member. He did **not**
  architect its agentic layer and did **not** implement its Azure OpenAI
  integration. Write "contributed to", never "built" or "created".
- **Azure OpenAI is not one of his skills.** He has only light Azure exposure.
  It may describe a platform's stack; it must never appear in `stack`.
- **The teaching role is excluded permanently**, at his instruction — he was an
  assistant and the old CV entry overstated it.
- **RobinFood is real** (a six-month university práctica, Nov 2022 – Apr 2023)
  but excluded by his choice. Real and excluded are different things.
- **Foundever was a selection process only**, never a role.

`lib/data.test.ts` enforces the first three. The tests fail if `stack` mentions
Azure, if the Janover entry claims Burrito was built or architected, or if any
excluded employer reappears.

## What the tests actually guard

| Test | Failure it prevents |
|---|---|
| reverse chronological | a role inserted in the wrong place |
| every role has the fields both layouts need | a role that renders blank on one page |
| current roles come first | NeuralSeek and TechD run concurrently — this allows several |
| covers every month from Jan 2024 | an unexplained employment gap |
| excluded history appears nowhere | the teaching role or Foundever creeping back |
| work email, never the personal one | the wrong address on a CV |
| projects leak no infrastructure detail | domains, IPs, hostnames or the client's name reaching a public document |
| honesty guardrails | overclaiming Burrito or Azure |

`scripts/check-build.mjs` repeats the content checks against the built HTML,
because a test passing on the data says nothing about what actually rendered.
