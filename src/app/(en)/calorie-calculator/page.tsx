import { Metadata } from 'next'
import CalorieCalculator from '@/components/tools/CalorieCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Calorie Calculator - Free Online Tool | toolcase',
  description: 'Calculate daily calorie needs based on your goals. Free online calorie calculator for weight loss, maintenance and muscle gain.',
  alternates: { canonical: 'https://toolcase.cc/calorie-calculator', languages: { en: 'https://toolcase.cc/calorie-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/calorie-calculator' } },
}

const faqs = [
  { question: 'How are daily calorie needs calculated?', answer: 'Daily calorie needs are calculated using your Basal Metabolic Rate (BMR) multiplied by an activity factor. BMR is estimated using formulas like Mifflin-St Jeor, which takes into account your age, gender, height and weight. The activity multiplier adjusts for how active you are throughout the day.' },
  { question: 'How many calories should I eat to lose weight?', answer: 'A safe and sustainable calorie deficit is typically 500 calories per day below your maintenance level, which leads to approximately 0.5 kg (1 lb) of weight loss per week. Very low calorie diets below 1200 calories are generally not recommended without medical supervision.' },
  { question: 'What is the difference between BMR and TDEE?', answer: 'BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest just to maintain basic functions like breathing and circulation. TDEE (Total Daily Energy Expenditure) is your BMR multiplied by your activity level, representing the total calories you burn in a day including exercise and daily movement.' },
]

export default function CalorieCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Calorie Calculator', url: 'https://toolcase.cc/calorie-calculator' },
        ]}
      />
      <ToolSchema
        name="Calorie Calculator"
        description="Calculate daily calorie needs based on your goals. Free online calorie calculator for weight loss, maintenance and muscle gain."
        url="https://toolcase.cc/calorie-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Calorie Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Calorie Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate daily calorie needs based on your goals.</p>
      <CalorieCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter your age, gender, height, weight and activity level. Choose your goal — lose weight, maintain weight or gain muscle. The calculator will show your recommended daily calorie intake along with a macronutrient breakdown.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="calorie-calculator" locale="en" />
    </div>
    </>
  )
}
