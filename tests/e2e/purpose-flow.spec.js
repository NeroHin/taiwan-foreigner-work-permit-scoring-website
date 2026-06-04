import { expect, test } from '@playwright/test'

test('purpose selection changes the visible workflow', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: '先選目的，再給你該看的分數與步驟' })).toBeVisible()
  await expect(page.getByText('文件先不打擾')).toBeVisible()

  await page.getByTestId('purpose-apply').click()
  await expect(page.getByText('依用途整理的文件')).toBeVisible()
  await expect(page.getByText('申請書')).toBeVisible()

  await page.getByTestId('purpose-renew').click()
  await expect(page.getByText('這次展延要加計或調整點數嗎？')).toBeVisible()
  await expect(page.getByText('原聘僱許可函文號或影本')).toBeVisible()
})

test('score updates immediately from selected answers', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('section-education').getByText('碩士學位').click()
  await page.getByTestId('section-salary').getByText('月薪 40,000 至未達 47,971 元').click()
  await page.getByTestId('section-mandarin').getByText('進階等級').click()

  await expect(page.getByText('已達 70 分門檻').first()).toBeVisible()
  await expect(page.getByText('70 / 200')).toBeVisible()
})
