import { baseDocuments, PASSING_SCORE, renewalDocuments, scoringSections } from './data/scoring.js'

export function getInitialAnswers() {
  return Object.fromEntries(scoringSections.map((section) => [section.id, 0]))
}

export function calculateScore(answers) {
  return scoringSections.reduce((sum, section) => {
    const value = Number(answers[section.id] ?? 0)
    return sum + value
  }, 0)
}

export function getScoreStatus(score) {
  const gap = Math.max(PASSING_SCORE - score, 0)

  return {
    passed: score >= PASSING_SCORE,
    gap,
    message: score >= PASSING_SCORE ? '已達 70 分門檻' : `尚差 ${gap} 分`
  }
}

export function getDocumentsForPurpose(purpose, wantsNewPoints = true) {
  if (purpose === 'renew') {
    return wantsNewPoints
      ? renewalDocuments
      : ['評點表', '原聘僱許可函文號或影本', '護照影本或外僑居留證影本']
  }

  if (purpose === 'estimate') {
    return []
  }

  return baseDocuments
}

export function getNextSteps(purpose, score, wantsNewPoints = true) {
  const status = getScoreStatus(score)

  if (purpose === 'estimate') {
    return status.passed
      ? ['儲存目前分數', '確認雇主工作類別是否符合專門性或技術性工作', '需要送件時再切換到「準備送件」查看文件']
      : ['先補足薪資、華語能力或工作經驗等高分項目', '確認每個加分項目是否拿得到證明文件', '分數接近 70 後再整理送件文件']
  }

  if (purpose === 'renew') {
    return wantsNewPoints
      ? ['確認要新增或調整的評點項目', '補齊新增項目的證明文件', '和雇主確認展延契約與原許可資訊']
      : ['準備評點表與原許可資訊', '確認護照或居留證仍有效', '由雇主線上送出展延申請']
  }

  return status.passed
    ? ['檢查所有加分項目的證明文件', '請雇主確認契約、登記與工作項目資料', '到官方申辦網進行線上申請']
    : ['先不要送件', `至少再補 ${status.gap} 分`, '優先確認薪資、華語、職務特殊專長或政策項目']
}
