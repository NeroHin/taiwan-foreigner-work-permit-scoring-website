<script setup>
import { computed, reactive, ref } from 'vue'
import { baseDocuments, MAX_SCORE, officialLinks, PASSING_SCORE, purposes, scoringSections } from './data/scoring.js'
import { calculateScore, getDocumentsForPurpose, getInitialAnswers, getNextSteps, getScoreStatus } from './scoring.js'

const selectedPurpose = ref('estimate')
const wantsNewPoints = ref(true)
const answers = reactive(getInitialAnswers())

const purpose = computed(() => purposes.find((item) => item.id === selectedPurpose.value))
const score = computed(() => calculateScore(answers))
const status = computed(() => getScoreStatus(score.value))
const progress = computed(() => Math.min(Math.round((score.value / PASSING_SCORE) * 100), 100))
const documents = computed(() => getDocumentsForPurpose(selectedPurpose.value, wantsNewPoints.value))
const nextSteps = computed(() => getNextSteps(selectedPurpose.value, score.value, wantsNewPoints.value))
const shouldShowDocuments = computed(() => selectedPurpose.value !== 'estimate')
const selectedEvidence = computed(() =>
  scoringSections
    .filter((section) => Number(answers[section.id]) > 0)
    .map((section) => section.evidence)
)
</script>

<template>
  <main class="app-shell">
    <section class="hero">
      <div>
        <p class="eyebrow">僑外生留臺工作評點制</p>
        <h1>先選目的，再給你該看的分數與步驟</h1>
        <p class="hero-copy">
          有些人只想快速估分，有些人已經準備送件，也有人只是要展延。這裡會依你的用途調整文件與下一步。
        </p>
      </div>

      <aside class="score-panel" aria-live="polite">
        <span>{{ status.message }}</span>
        <strong>{{ score }} / {{ MAX_SCORE }}</strong>
        <van-progress :percentage="progress" color="oklch(0.55 0.14 176)" stroke-width="8" />
        <small>官方合格門檻：{{ PASSING_SCORE }} 分</small>
      </aside>
    </section>

    <section class="purpose-grid" aria-label="選擇使用目的">
      <button
        v-for="item in purposes"
        :key="item.id"
        type="button"
        class="purpose-card"
        :class="{ active: selectedPurpose === item.id }"
        :data-testid="`purpose-${item.id}`"
        @click="selectedPurpose = item.id"
      >
        <span>{{ item.title }}</span>
        <small>{{ item.description }}</small>
      </button>
    </section>

    <van-cell-group v-if="selectedPurpose === 'renew'" inset class="renew-box">
      <van-cell title="這次展延要加計或調整點數嗎？">
        <template #right-icon>
          <van-switch v-model="wantsNewPoints" size="24" />
        </template>
      </van-cell>
      <p>
        {{ wantsNewPoints ? '會顯示展延文件與新增評點證明。' : '依官方說明，曾獲評點制許可且無欲加計點數者，可聚焦評點表與原許可資訊。' }}
      </p>
    </van-cell-group>

    <section class="content-layout">
      <div class="form-column">
        <div class="section-heading">
          <p class="eyebrow">{{ purpose.title }}</p>
          <h2>八項評點</h2>
          <p>{{ purpose.primaryStep }}</p>
        </div>

        <van-cell-group
          v-for="section in scoringSections"
          :key="section.id"
          inset
          class="question-block"
          :data-testid="`section-${section.id}`"
        >
          <van-field :label="section.title" label-align="top">
            <template #input>
              <van-radio-group v-model="answers[section.id]" class="radio-list">
                <van-radio
                  v-for="option in section.options"
                  :key="`${section.id}-${option.points}-${option.label}`"
                  :name="option.points"
                >
                  <span>{{ option.label }}</span>
                  <b>{{ option.points }} 分</b>
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <p class="evidence">{{ section.evidence }}</p>
        </van-cell-group>
      </div>

      <aside class="result-column">
        <van-cell-group inset class="summary-block">
        <van-cell title="目前結果" :value="status.message" />
          <van-cell title="下一步">
            <template #label>
              <ol class="step-list">
                <li v-for="step in nextSteps" :key="step">{{ step }}</li>
              </ol>
            </template>
          </van-cell>
        </van-cell-group>

        <van-cell-group v-if="shouldShowDocuments" inset class="summary-block">
          <van-cell title="依用途整理的文件" />
          <van-checkbox-group>
            <van-cell v-for="document in documents" :key="document" :title="document">
              <template #right-icon>
                <van-checkbox :name="document" />
              </template>
            </van-cell>
          </van-checkbox-group>
        </van-cell-group>

        <van-cell-group v-else inset class="summary-block">
          <van-cell title="文件先不打擾" label="你選的是快速估分。等你要送件時，再切換到準備送件查看完整清單。" />
        </van-cell-group>

        <van-cell-group v-if="selectedEvidence.length" inset class="summary-block">
          <van-cell title="你目前選到的證明方向" />
          <van-cell v-for="item in selectedEvidence" :key="item" :title="item" />
        </van-cell-group>

        <van-cell-group inset class="summary-block">
          <van-cell title="官方參考" />
          <van-cell
            v-for="link in officialLinks"
            :key="link.href"
            :title="link.label"
            is-link
            :url="link.href"
          />
        </van-cell-group>
      </aside>
    </section>
  </main>
</template>
