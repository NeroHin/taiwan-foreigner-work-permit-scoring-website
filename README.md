# 僑外生留臺工作評點制試算

Vue 3 / Vant 4 / Vite 8 implementation for estimating points under Taiwan's "New Scoring Criteria for Foreign and Overseas Chinese Students to Work in Taiwan".

The app starts by asking the visitor's purpose, because not every visitor wants the same next step after seeing a score:

- 快速估分: focus on score and gaps first.
- 準備申請: show score and required documents together.
- 已有許可/展延: prioritize renewal documents and only ask for scoring evidence when points are being changed.

## Development

```bash
npm install
npm run dev
```

## GitHub Pages

GitHub Pages is supported as a pure static Vue build. Build output is committed to `docs/` so the repository can use branch-based Pages without GitHub Actions.

```bash
npm run build:pages
```

Configure GitHub Pages to deploy from `main` / `docs`.

## Verification

```bash
npm run build
npm run test
npm run test:e2e
```
