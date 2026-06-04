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

Optional Fastify server:

```bash
npm run server
```

## Verification

```bash
npm run build
npm run test
```
