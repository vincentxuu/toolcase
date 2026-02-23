import { Metadata } from 'next'
import WeightLossPlan from '@/components/tools/WeightLossPlan'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Weight Loss & Running Plan Calculator - Personalized Fat Loss Plan | toolcase',
  description: 'Free weight loss & running plan calculator. Create your fat loss plan with running schedule, calorie targets, heart rate zones, and reality check on diet vs exercise.',
  keywords: ['weight loss plan', 'running plan', 'fat loss calculator', 'calorie deficit', 'running calories', 'TDEE calculator', 'heart rate zone', 'diet vs exercise'],
  alternates: {
    canonical: 'https://toolcase.cc/health/weight-loss-plan',
    languages: {
      en: 'https://toolcase.cc/health/weight-loss-plan',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/health/weight-loss-plan'
    }
  },
}

const faqs = [
  {
    question: 'How many calories should I eat to lose weight?',
    answer: 'To lose weight, you need to create a calorie deficit. A safe and sustainable deficit is 500-1000 calories per day, which typically results in 0.5-1 kg weight loss per week. However, you should never go below 1200 calories per day for women or 1500 for men without medical supervision.'
  },
  {
    question: 'What is a healthy rate of weight loss?',
    answer: 'A healthy and sustainable rate is 0.5-1 kg (1-2 lbs) per week. Losing weight too quickly can lead to muscle loss, nutritional deficiencies, and other health issues. Slow and steady weight loss is more likely to be permanent.'
  },
  {
    question: 'How do I calculate my TDEE?',
    answer: 'TDEE (Total Daily Energy Expenditure) is calculated by first determining your BMR (Basal Metabolic Rate) using the Mifflin-St Jeor equation, then multiplying it by your activity level factor (1.2 for sedentary to 1.9 for very active).'
  },
  {
    question: 'What macronutrient ratio should I use?',
    answer: 'This calculator uses a balanced 40/30/30 ratio (40% carbs, 30% protein, 30% fat), which works well for most people. However, you may need to adjust based on your preferences, activity level, and specific goals. Higher protein (30-35%) helps preserve muscle during weight loss.'
  },
  {
    question: 'Can I lose weight faster than recommended?',
    answer: 'While it\'s possible to lose weight faster, it\'s not recommended. Rapid weight loss often results in muscle loss, decreased metabolism, nutritional deficiencies, and is difficult to maintain long-term. Stick to 0.5-1 kg per week for best results.'
  },
  {
    question: 'Should I exercise while losing weight?',
    answer: 'Yes! Exercise, especially strength training, helps preserve muscle mass during weight loss, boosts metabolism, and improves overall health. Aim for at least 150 minutes of moderate activity per week, plus 2-3 strength training sessions.'
  },
  {
    question: 'Will running 30 minutes a day help me lose weight?',
    answer: 'Running 30 minutes can burn 200-400 calories depending on your weight and intensity. However, this only accounts for a portion of the calorie deficit needed for weight loss. For example, to lose 0.5 kg/week, you need a weekly deficit of 3,850 calories. Running alone might provide only 20-30% of this. Diet control is essential for successful fat loss.'
  },
  {
    question: 'What heart rate should I maintain while running for fat loss?',
    answer: 'For optimal fat burning, maintain your heart rate in the "fat burning zone" which is 60-75% of your maximum heart rate. Your max heart rate is approximately 220 minus your age. For example, if you\'re 30 years old, your max HR is 190 bpm, and your fat burning zone is 114-143 bpm.'
  },
  {
    question: 'Can I lose weight by running without changing my diet?',
    answer: 'While running burns calories, it\'s very difficult to lose weight through exercise alone. Most people can\'t out-run a poor diet. Research shows that combining diet control with exercise is far more effective than exercise alone. If you run but don\'t control portions, your fat loss effectiveness may be less than 50%.'
  },
]

export default function WeightLossPlanPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Health', url: 'https://toolcase.cc/health' },
          { name: 'Weight Loss Plan', url: 'https://toolcase.cc/health/weight-loss-plan' },
        ]}
      />
      <ToolSchema
        name="Weight Loss Plan Calculator"
        description="Free weight loss plan calculator. Set your goals, calculate daily calories, get macro breakdowns, and estimate your target date."
        url="https://toolcase.cc/health/weight-loss-plan"
        category="HealthApplication"
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Health', href: '/health' },
            { name: 'Weight Loss Plan' },
          ]}
        />

        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Weight Loss & Running Plan Calculator
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
          Create a personalized fat loss plan with running schedule, calorie targets, heart rate zones, and realistic expectations about diet vs exercise.
        </p>

        <WeightLossPlan
          labels={{
            // Basic Info
            age: 'Age',
            gender: 'Gender',
            male: 'Male',
            female: 'Female',
            height: 'Height',
            currentWeight: 'Current Weight',
            targetWeight: 'Target Weight',
            cm: 'cm',
            kg: 'kg',
            // Activity
            activityLevel: 'Activity Level',
            sedentary: 'Sedentary (little/no exercise)',
            light: 'Light (1-3 days/week)',
            moderate: 'Moderate (3-5 days/week)',
            active: 'Active (6-7 days/week)',
            veryActive: 'Very Active (athlete)',
            // Weight Loss Settings
            weeklyGoal: 'Weekly Weight Loss Goal',
            conservative: 'Conservative (0.25 kg/week)',
            moderate_goal: 'Moderate (0.5 kg/week)',
            aggressive: 'Aggressive (0.75 kg/week)',
            veryAggressive: 'Very Aggressive (1 kg/week)',
            // Running Settings
            runningDays: 'Running Days',
            daysPerWeek: 'days/week',
            runningDuration: 'Running Duration',
            minutes: 'minutes',
            // Results
            currentMetrics: 'Current Metrics',
            bmr: 'BMR',
            tdee: 'TDEE',
            dailyCalories: 'cal/day',
            weightToLose: 'Weight to Lose',
            estimatedTime: 'Estimated Time',
            weeks: 'weeks',
            // Nutrition
            macros: 'Macro Breakdown',
            protein: 'Protein',
            carbs: 'Carbs',
            fat: 'Fat',
            grams: 'g/day',
            calories: 'cal',
            // Plan Details
            planSummary: 'Your Weight Loss Plan',
            dailyCalorieTarget: 'Daily Calorie Target',
            dailyDeficit: 'Daily Calorie Deficit',
            weeklyWeightLoss: 'Weekly Weight Loss',
            targetDate: 'Estimated Target Date',
            // Running Plan
            runningPlan: 'Running Plan',
            runningBurnPerSession: 'Calories Burned per Session',
            weeklyRunningBurn: 'Weekly Running Burn',
            distancePerSession: 'Distance per Session',
            heartRateZone: 'Heart Rate Zone',
            maxHeartRate: 'Max Heart Rate',
            fatBurningZone: 'Fat Burning Zone',
            bpm: 'bpm',
            // Reality Check
            realityCheck: 'Reality Check',
            runningOnlyWeight: 'Weight Loss from Running Only',
            dietOnlyWarning: 'Diet is Essential',
            combinedApproach: 'Best Approach: Combine Diet + Exercise',
            // Tips
            tipsTitle: 'Tips for Success',
            tip1: 'Drink at least 2-3 liters of water daily',
            tip2: 'Get 7-9 hours of quality sleep each night',
            tip3: 'Include strength training 2-3 times per week',
            tip4: 'Track your food intake and stay consistent',
            tip5: 'If you only run without controlling diet, fat loss may be <50% effective',
            disclaimer: 'This tool provides estimates only. Consult a healthcare professional or registered dietitian before starting any weight loss program.',
          }}
        />

        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            How to Use This Weight Loss & Running Calculator
          </h2>
          <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            <ol style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Enter your basic information:</strong> Age, gender, height, current weight, and target weight.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Select your activity level:</strong> Be honest about your current activity level for accurate results.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Choose your weekly goal:</strong> Start with 0.5 kg/week for sustainable results. Adjust based on your progress.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Set your running plan:</strong> Enter how many days per week you plan to run and for how long (e.g., 3 days × 30 minutes).
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Review your plan:</strong> Check your daily calorie target, macro breakdown, and running schedule. Pay attention to the &ldquo;Reality Check&rdquo; section.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Understand the reality:</strong> The tool shows how much weight loss comes from running vs diet control. Most people need both for success.
              </li>
              <li>
                <strong>Track and adjust:</strong> Monitor your progress weekly and adjust your plan if needed.
              </li>
            </ol>
          </div>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Understanding Your Results
          </h2>
          <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>BMR (Basal Metabolic Rate):</strong> The number of calories your body burns at rest. This is the minimum energy needed to maintain basic bodily functions.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>TDEE (Total Daily Energy Expenditure):</strong> Your total calorie burn including daily activities and exercise. This is your maintenance calories.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Calorie Deficit:</strong> The difference between your TDEE and your target calories. A 500 cal/day deficit typically results in 0.5 kg weight loss per week.
            </p>
            <p>
              <strong>Macros:</strong> The breakdown shows how to distribute your calories across protein, carbs, and fats. Protein is crucial for preserving muscle during weight loss.
            </p>
          </div>
        </section>

        <FaqSection items={faqs} />
        <RelatedTools current="weight-loss-plan" locale="en" />
      </div>
    </>
  )
}
