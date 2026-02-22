'use client'
import { useState, useMemo } from 'react'

interface GpaCalculatorProps {
  labels?: {
    courseName: string
    credits: string
    grade: string
    addCourse: string
    remove: string
    totalCredits: string
    cumulativeGpa: string
    course: string
  }
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0,
}

const GRADES = Object.keys(GRADE_POINTS)

interface Course {
  id: number
  name: string
  credits: number
  grade: string
}

let nextId = 3

export default function GpaCalculator({ labels }: GpaCalculatorProps) {
  const l = {
    courseName: labels?.courseName ?? 'Course Name',
    credits: labels?.credits ?? 'Credits',
    grade: labels?.grade ?? 'Grade',
    addCourse: labels?.addCourse ?? 'Add Course',
    remove: labels?.remove ?? 'Remove',
    totalCredits: labels?.totalCredits ?? 'Total Credits',
    cumulativeGpa: labels?.cumulativeGpa ?? 'Cumulative GPA',
    course: labels?.course ?? 'Course',
  }

  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Course 1', credits: 3, grade: 'A' },
    { id: 2, name: 'Course 2', credits: 3, grade: 'B+' },
  ])

  const result = useMemo(() => {
    let totalCredits = 0
    let totalPoints = 0
    for (const c of courses) {
      totalCredits += c.credits
      totalPoints += c.credits * GRADE_POINTS[c.grade]
    }
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0
    return { totalCredits, gpa }
  }, [courses])

  const addCourse = () => {
    setCourses([...courses, { id: nextId++, name: `${l.course} ${courses.length + 1}`, credits: 3, grade: 'A' }])
  }

  const removeCourse = (id: number) => {
    if (courses.length > 1) setCourses(courses.filter((c) => c.id !== id))
  }

  const updateCourse = (id: number, field: keyof Course, value: string | number) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '0.75rem', alignItems: 'end' }}>
          <label style={labelStyle}>{l.courseName}</label>
          <label style={labelStyle}>{l.credits}</label>
          <label style={labelStyle}>{l.grade}</label>
          <span style={{ width: '70px' }} />
        </div>
        {courses.map((course) => (
          <div key={course.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '0.75rem', alignItems: 'center' }}>
            <input
              type="text"
              style={inputStyle}
              value={course.name}
              onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
            />
            <select
              style={inputStyle}
              value={course.credits}
              onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              style={inputStyle}
              value={course.grade}
              onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
            >
              {GRADES.map((g) => (
                <option key={g} value={g}>{g} ({GRADE_POINTS[g].toFixed(1)})</option>
              ))}
            </select>
            <button
              onClick={() => removeCourse(course.id)}
              style={{
                padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-error)', cursor: 'pointer',
                fontSize: '0.875rem', opacity: courses.length <= 1 ? 0.4 : 1,
              }}
              disabled={courses.length <= 1}
            >
              {l.remove}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addCourse}
        style={{
          padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '2px dashed var(--color-border)',
          backgroundColor: 'transparent', color: 'var(--color-primary)', cursor: 'pointer',
          fontSize: '0.875rem', fontWeight: 600,
        }}
      >
        + {l.addCourse}
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.totalCredits}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            {result.totalCredits}
          </div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.cumulativeGpa}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-success)' }}>
            {result.gpa.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}
