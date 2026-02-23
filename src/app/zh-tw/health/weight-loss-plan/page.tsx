import { Metadata } from 'next'
import WeightLossPlan from '@/components/tools/WeightLossPlan'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '減脂跑步計畫計算器 - 個人化燃脂計畫 | toolcase',
  description: '免費減脂跑步計畫計算器。打造個人化燃脂計畫，包含跑步規劃、熱量目標、心率區間與飲食運動現實檢視。',
  keywords: ['減脂計畫', '跑步減脂', '燃脂計算器', '熱量赤字', '跑步熱量', 'TDEE計算器', '心率區間', '飲食vs運動'],
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/health/weight-loss-plan',
    languages: {
      en: 'https://toolcase.cc/health/weight-loss-plan',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/health/weight-loss-plan'
    }
  },
}

const faqs = [
  {
    question: '減脂期間每天應該攝取多少熱量？',
    answer: '要減重，您需要創造熱量赤字。安全且可持續的赤字是每天 500-1000 大卡，通常會導致每週減重 0.5-1 公斤。但是，女性不應低於每天 1200 大卡，男性不應低於 1500 大卡，除非有醫療監督。'
  },
  {
    question: '健康的減重速度是多少？',
    answer: '健康且可持續的減重速度是每週 0.5-1 公斤（1-2 磅）。減重太快可能導致肌肉流失、營養不良和其他健康問題。緩慢而穩定的減重更有可能是永久性的。'
  },
  {
    question: '如何計算我的 TDEE？',
    answer: 'TDEE（每日總熱量消耗）是透過首先使用 Mifflin-St Jeor 公式確定您的 BMR（基礎代謝率），然後乘以您的活動水平係數（久坐為 1.2，非常活躍為 1.9）來計算的。'
  },
  {
    question: '應該使用什麼營養素比例？',
    answer: '此計算器使用平衡的 40/30/30 比例（40% 碳水化合物、30% 蛋白質、30% 脂肪），適合大多數人。但是，您可能需要根據個人偏好、活動水平和特定目標進行調整。較高的蛋白質（30-35%）有助於在減重期間保持肌肉。'
  },
  {
    question: '我可以比建議的速度更快減重嗎？',
    answer: '雖然可以更快減重，但不建議這樣做。快速減重通常會導致肌肉流失、新陳代謝下降、營養不良，並且難以長期維持。堅持每週 0.5-1 公斤以獲得最佳效果。'
  },
  {
    question: '減重期間應該運動嗎？',
    answer: '是的！運動，尤其是力量訓練，有助於在減重期間保持肌肉量、提高新陳代謝並改善整體健康。每週至少進行 150 分鐘的中等強度活動，加上 2-3 次力量訓練。'
  },
  {
    question: '每天跑步 30 分鐘能減脂嗎？',
    answer: '跑步 30 分鐘可以消耗 200-400 大卡，取決於您的體重和強度。然而，這只佔減重所需熱量赤字的一部分。例如，要每週減 0.5 公斤，需要每週 3,850 大卡的赤字。單靠跑步可能只提供 20-30%。飲食控制對成功減脂至關重要。'
  },
  {
    question: '跑步減脂應該維持什麼心率？',
    answer: '為了達到最佳燃脂效果，應將心率維持在「燃脂區間」，即最大心率的 60-75%。最大心率約為 220 減去您的年齡。例如，30 歲的人最大心率是 190，燃脂區間為 114-143 次/分。'
  },
  {
    question: '只跑步不改變飲食能減重嗎？',
    answer: '雖然跑步會消耗熱量，但僅靠運動減重非常困難。大多數人無法跑贏糟糕的飲食。研究顯示，結合飲食控制與運動的效果遠優於單純運動。如果只跑步不控制份量，減脂效果可能低於 50%。'
  },
]

export default function WeightLossPlanPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '健康', url: 'https://toolcase.cc/zh-tw/health' },
          { name: '減脂計畫', url: 'https://toolcase.cc/zh-tw/health/weight-loss-plan' },
        ]}
      />
      <ToolSchema
        name="減脂計畫計算器"
        description="免費減脂計畫計算器。設定目標體重、計算每日熱量、營養素分配建議，並預估達成時間。"
        url="https://toolcase.cc/zh-tw/health/weight-loss-plan"
        category="HealthApplication"
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '健康', href: '/zh-tw/health' },
            { name: '減脂計畫' },
          ]}
        />

        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          減脂跑步計畫計算器
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
          打造個人化燃脂計畫，包含跑步規劃、熱量目標、心率區間，以及飲食與運動的現實檢視。
        </p>

        <WeightLossPlan
          labels={{
            // Basic Info
            age: '年齡',
            gender: '性別',
            male: '男性',
            female: '女性',
            height: '身高',
            currentWeight: '目前體重',
            targetWeight: '目標體重',
            cm: '公分',
            kg: '公斤',
            // Activity
            activityLevel: '活動量',
            sedentary: '久坐（少運動或不運動）',
            light: '輕度活動（每週 1-3 天）',
            moderate: '中度活動（每週 3-5 天）',
            active: '高度活動（每週 6-7 天）',
            veryActive: '非常活躍（運動員）',
            // Weight Loss Settings
            weeklyGoal: '每週減重目標',
            conservative: '保守（每週 0.25 公斤）',
            moderate_goal: '適中（每週 0.5 公斤）',
            aggressive: '積極（每週 0.75 公斤）',
            veryAggressive: '非常積極（每週 1 公斤）',
            // Running Settings
            runningDays: '跑步天數',
            daysPerWeek: '天/週',
            runningDuration: '跑步時長',
            minutes: '分鐘',
            // Results
            currentMetrics: '目前指標',
            bmr: '基礎代謝率',
            tdee: '每日總消耗',
            dailyCalories: '大卡/天',
            weightToLose: '需減重',
            estimatedTime: '預估時間',
            weeks: '週',
            // Nutrition
            macros: '營養素分配',
            protein: '蛋白質',
            carbs: '碳水化合物',
            fat: '脂肪',
            grams: '公克/天',
            calories: '大卡',
            // Plan Details
            planSummary: '您的減脂計畫',
            dailyCalorieTarget: '每日熱量目標',
            dailyDeficit: '每日熱量赤字',
            weeklyWeightLoss: '每週減重',
            targetDate: '預估達成日期',
            // Running Plan
            runningPlan: '跑步計畫',
            runningBurnPerSession: '每次消耗熱量',
            weeklyRunningBurn: '每週跑步消耗',
            distancePerSession: '每次距離',
            heartRateZone: '心率區間',
            maxHeartRate: '最大心率',
            fatBurningZone: '燃脂區間',
            bpm: '次/分',
            // Reality Check
            realityCheck: '現實檢視',
            runningOnlyWeight: '僅靠跑步減重',
            dietOnlyWarning: '飲食控制是關鍵',
            combinedApproach: '最佳方法：結合飲食與運動',
            // Tips
            tipsTitle: '成功秘訣',
            tip1: '每天至少喝 2-3 公升的水',
            tip2: '每晚保持 7-9 小時的優質睡眠',
            tip3: '每週進行 2-3 次力量訓練',
            tip4: '記錄飲食攝取並保持一致性',
            tip5: '只跑步不控制飲食，減脂效果可能<50%',
            disclaimer: '此工具僅提供估算值。開始任何減重計畫前，請諮詢醫療專業人員或註冊營養師。',
          }}
        />

        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            如何使用減脂跑步計畫計算器
          </h2>
          <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            <ol style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>輸入基本資料：</strong>年齡、性別、身高、目前體重和目標體重。
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>選擇活動量：</strong>誠實評估您目前的活動水平，以獲得準確的結果。
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>設定每週目標：</strong>建議從每週 0.5 公斤開始，以獲得可持續的結果。根據進度調整。
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>設定跑步計畫：</strong>輸入您每週計畫跑步的天數和時長（例如：每週 3 天 × 每次 30 分鐘）。
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>檢視您的計畫：</strong>查看每日熱量目標、營養素分配和跑步規劃。特別注意「現實檢視」部分。
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>理解現實：</strong>工具會顯示有多少減重來自跑步、多少來自飲食控制。大多數人需要兩者結合才能成功。
              </li>
              <li>
                <strong>追蹤並調整：</strong>每週監控進度，如有需要可調整計畫。
              </li>
            </ol>
          </div>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            了解您的結果
          </h2>
          <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>BMR（基礎代謝率）：</strong>您的身體在靜息狀態下燃燒的熱量。這是維持基本身體功能所需的最低能量。
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>TDEE（每日總熱量消耗）：</strong>包括日常活動和運動在內的總熱量消耗。這是您的維持熱量。
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>熱量赤字：</strong>您的 TDEE 與目標熱量之間的差異。每天 500 大卡的赤字通常會導致每週減重 0.5 公斤。
            </p>
            <p>
              <strong>營養素：</strong>分配顯示如何將熱量分配給蛋白質、碳水化合物和脂肪。蛋白質對於在減重期間保持肌肉至關重要。
            </p>
          </div>
        </section>

        <FaqSection items={faqs} />
        <RelatedTools current="weight-loss-plan" locale="zh-tw" />
      </div>
    </>
  )
}
