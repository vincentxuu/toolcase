import { Metadata } from 'next'
import BloodTypePersonality from '@/components/tools/BloodTypePersonality'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Blood Type Personality - A/B/O/AB Traits & Compatibility | toolcase',
  description: 'Select your blood type to see personality traits, strengths, weaknesses, and compatibility analysis. Complete guide to A, B, O, and AB blood type personalities.',
  alternates: { canonical: 'https://toolcase.cc/everyday/blood-type-personality', languages: { en: 'https://toolcase.cc/everyday/blood-type-personality', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/blood-type-personality' } },
}

const faqs = [
  { question: 'Is blood type personality scientifically proven?', answer: 'There is currently no strong scientific evidence linking blood type to personality. Blood type personality theory is popular in Japan, South Korea, and Taiwan as part of pop culture. It should be treated as entertainment rather than fact.' },
  { question: 'What is the distribution of blood types?', answer: 'Blood type distribution varies by country and ethnicity. Globally, O is the most common (~44%), followed by A (~26%), B (~23%), and AB (~7%). The exact percentages differ significantly across populations.' },
  { question: 'Is blood type compatibility reliable?', answer: 'Blood type compatibility for relationships is a folk belief with no scientific support. Real relationships depend on personal values, communication styles, and mutual respect — not blood type.' },
]

export default function BloodTypePersonalityPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Blood Type Personality', url: 'https://toolcase.cc/everyday/blood-type-personality' },
        ]}
      />
      <ToolSchema
        name="Blood Type Personality"
        description="Select your blood type to see personality traits, strengths, weaknesses, and compatibility analysis. Complete guide to A, B, O, and AB blood type personalities."
        url="https://toolcase.cc/everyday/blood-type-personality"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Blood Type Personality' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Blood Type Personality</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Select your blood type to explore personality traits, strengths, weaknesses, and compatibility.</p>
      <BloodTypePersonality labels={{
        selectType: 'Select your blood type',
        lookup: 'View Analysis',
        yourType: 'Your Blood Type',
        strengths: 'Strengths',
        weaknesses: 'Weaknesses',
        bestMatch: 'Best Match',
        worstMatch: 'Least Compatible',
        allTypes: 'All Blood Types Overview',
        type: 'Type',
        personality: 'Personality',
        compatibility: 'Compatibility',
        types: [
          {
            name: 'Type A',
            nickname: 'The Perfectionist',
            strengths: 'Detail-oriented, responsible, organized, cooperative, considerate and reliable',
            weaknesses: 'Prone to anxiety, overly cautious, stubborn, sometimes too concerned with others\' opinions',
            bestMatch: 'Type A, Type AB',
            worstMatch: 'Type B',
            description: 'Type A individuals are typically serious and meticulous, organized and responsible. They value harmonious relationships and often play the role of mediator in groups. Although calm on the surface, they have rich inner emotions.',
          },
          {
            name: 'Type B',
            nickname: 'The Free Spirit',
            strengths: 'Optimistic, creative, curious, easygoing, has wide interests and strong initiative',
            weaknesses: 'Self-centered, short attention span, poor at planning, sometimes willful',
            bestMatch: 'Type B, Type AB',
            worstMatch: 'Type A',
            description: 'Type B individuals are natural free spirits, passionate about things that interest them. They dislike being bound by rules and have unique ways of thinking and living. They are straightforward and easy to get along with.',
          },
          {
            name: 'Type O',
            nickname: 'The Natural Leader',
            strengths: 'Generous, natural leader, strong-willed, confident, straightforward and influential',
            weaknesses: 'Impulsive, overlooks details, opinionated, can be domineering at times',
            bestMatch: 'Type O, Type A',
            worstMatch: 'Type AB',
            description: 'Type O individuals are full of energy and leadership qualities, with natural charisma. They are decisive, goal-oriented, and don\'t back down easily from challenges. Strong social skills make them natural group leaders.',
          },
          {
            name: 'Type AB',
            nickname: 'The Rational Analyst',
            strengths: 'Rational, calm, versatile, creative, analytical and adaptable',
            weaknesses: 'Can seem distant, dual personality, indecisive, hard to understand',
            bestMatch: 'Type AB, Type B',
            worstMatch: 'Type O',
            description: 'Type AB individuals combine the meticulousness of Type A with the creativity of Type B, making them the rarest blood type. They are usually intelligent and rational, able to analyze problems from different angles. Their sometimes contradictory nature adds to their mysterious charm.',
          },
        ],
      }} />
      <FaqSection items={faqs} />
      <RelatedTools current="blood-type-personality" locale="en" />
    </div>
    </>
  )
}
