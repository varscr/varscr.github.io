# Docs

Documentation for `varscr.github.io` — Fabio Vargas's portfolio and CV.

| Doc | What it covers |
|---|---|
| [01-architecture.md](01-architecture.md) | How the site is put together and why the CV is not in the repo |
| [02-content.md](02-content.md) | `lib/data.ts`, the only place career text lives |
| [03-cv.md](03-cv.md) | Editing the CV, exporting the PDF, the print constraints |
| [04-operations.md](04-operations.md) | Commands, verification, deploy |
| [superpowers/specs/](superpowers/specs/) | Design spec for the rebuild |
| [superpowers/plans/](superpowers/plans/) | The implementation plan it was built from |

**The vault, not this folder, is the source of truth for career facts.**
`personal-obsidian-vault/Career/` holds the verified employment record, the
honesty guardrails, and which source document proves which date. This folder
documents the *site*; it goes stale when the code changes. Anything that would
still be true after this repo is deleted belongs in the vault.
