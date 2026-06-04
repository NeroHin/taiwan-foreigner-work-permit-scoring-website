import Fastify from 'fastify'
import { purposes, scoringSections } from '../src/data/scoring.js'
import { calculateScore, getDocumentsForPurpose, getNextSteps, getScoreStatus } from '../src/scoring.js'

const fastify = Fastify({ logger: true })

fastify.get('/api/rules', async () => ({
  purposes,
  scoringSections
}))

fastify.post('/api/score', async (request) => {
  const { answers = {}, purpose = 'estimate', wantsNewPoints = true } = request.body ?? {}
  const score = calculateScore(answers)

  return {
    score,
    status: getScoreStatus(score),
    documents: getDocumentsForPurpose(purpose, wantsNewPoints),
    nextSteps: getNextSteps(purpose, score, wantsNewPoints)
  }
})

const port = Number(process.env.PORT ?? 3001)
fastify.listen({ port, host: '0.0.0.0' })
