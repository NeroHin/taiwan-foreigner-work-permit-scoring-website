import { describe, expect, it } from 'vitest'
import { baseDocuments } from '../src/data/scoring.js'
import { calculateScore, getDocumentsForPurpose, getInitialAnswers, getNextSteps, getScoreStatus } from '../src/scoring.js'

describe('scoring logic', () => {
  it('calculates the official 70 point threshold status', () => {
    const answers = {
      ...getInitialAnswers(),
      education: 20,
      salary: 30,
      mandarin: 20
    }

    const score = calculateScore(answers)

    expect(score).toBe(70)
    expect(getScoreStatus(score)).toEqual({
      passed: true,
      gap: 0,
      message: '已達 70 分門檻'
    })
  })

  it('reports the gap when a visitor is under the threshold', () => {
    const score = calculateScore({
      ...getInitialAnswers(),
      education: 10,
      salary: 20
    })

    expect(score).toBe(30)
    expect(getScoreStatus(score).gap).toBe(40)
  })

  it('keeps quick estimates focused on score instead of documents', () => {
    expect(getDocumentsForPurpose('estimate')).toEqual([])
    expect(getNextSteps('estimate', 65)[0]).toContain('先補足')
  })

  it('separates application and renewal document needs', () => {
    expect(getDocumentsForPurpose('apply')).toEqual(baseDocuments)
    expect(getDocumentsForPurpose('renew', false)).toEqual([
      '評點表',
      '原聘僱許可函文號或影本',
      '護照影本或外僑居留證影本'
    ])
  })
})
