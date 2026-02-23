'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface Formula {
  name: string
  syntax: string
  description: string
  example: string
  category: string
}

interface ExcelFormulaGeneratorProps {
  labels?: {
    title: string
    category: string
    allCategories: string
    math: string
    statistical: string
    logical: string
    text: string
    dateTime: string
    lookup: string
    financial: string
    searchPlaceholder: string
    formulaName: string
    syntax: string
    description: string
    example: string
    copy: string
    copied: string
    noResults: string
  }
}

export default function ExcelFormulaGenerator({ labels }: ExcelFormulaGeneratorProps) {
  const l = {
    title: labels?.title ?? 'Excel Formula Generator',
    category: labels?.category ?? 'Category',
    allCategories: labels?.allCategories ?? 'All Categories',
    math: labels?.math ?? 'Math & Trig',
    statistical: labels?.statistical ?? 'Statistical',
    logical: labels?.logical ?? 'Logical',
    text: labels?.text ?? 'Text',
    dateTime: labels?.dateTime ?? 'Date & Time',
    lookup: labels?.lookup ?? 'Lookup & Reference',
    financial: labels?.financial ?? 'Financial',
    searchPlaceholder: labels?.searchPlaceholder ?? 'Search formulas...',
    formulaName: labels?.formulaName ?? 'Formula',
    syntax: labels?.syntax ?? 'Syntax',
    description: labels?.description ?? 'Description',
    example: labels?.example ?? 'Example',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    noResults: labels?.noResults ?? 'No formulas found',
  }

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const formulas: Formula[] = [
    // Math & Trig
    { name: 'SUM', syntax: '=SUM(number1, [number2], ...)', description: 'Adds all numbers in a range', example: '=SUM(A1:A10)', category: 'math' },
    { name: 'AVERAGE', syntax: '=AVERAGE(number1, [number2], ...)', description: 'Calculates the average of numbers', example: '=AVERAGE(A1:A10)', category: 'math' },
    { name: 'ROUND', syntax: '=ROUND(number, num_digits)', description: 'Rounds a number to specified digits', example: '=ROUND(A1, 2)', category: 'math' },
    { name: 'ABS', syntax: '=ABS(number)', description: 'Returns absolute value of a number', example: '=ABS(-5)', category: 'math' },
    { name: 'POWER', syntax: '=POWER(number, power)', description: 'Returns the result of a number raised to a power', example: '=POWER(2, 3)', category: 'math' },
    { name: 'SQRT', syntax: '=SQRT(number)', description: 'Returns the square root of a number', example: '=SQRT(16)', category: 'math' },
    { name: 'MOD', syntax: '=MOD(number, divisor)', description: 'Returns the remainder after division', example: '=MOD(10, 3)', category: 'math' },

    // Statistical
    { name: 'COUNT', syntax: '=COUNT(value1, [value2], ...)', description: 'Counts cells that contain numbers', example: '=COUNT(A1:A10)', category: 'statistical' },
    { name: 'COUNTA', syntax: '=COUNTA(value1, [value2], ...)', description: 'Counts non-empty cells', example: '=COUNTA(A1:A10)', category: 'statistical' },
    { name: 'COUNTIF', syntax: '=COUNTIF(range, criteria)', description: 'Counts cells that meet a criteria', example: '=COUNTIF(A1:A10, ">5")', category: 'statistical' },
    { name: 'MAX', syntax: '=MAX(number1, [number2], ...)', description: 'Returns the largest value', example: '=MAX(A1:A10)', category: 'statistical' },
    { name: 'MIN', syntax: '=MIN(number1, [number2], ...)', description: 'Returns the smallest value', example: '=MIN(A1:A10)', category: 'statistical' },
    { name: 'MEDIAN', syntax: '=MEDIAN(number1, [number2], ...)', description: 'Returns the median value', example: '=MEDIAN(A1:A10)', category: 'statistical' },

    // Logical
    { name: 'IF', syntax: '=IF(logical_test, value_if_true, value_if_false)', description: 'Returns one value if true, another if false', example: '=IF(A1>10, "Yes", "No")', category: 'logical' },
    { name: 'AND', syntax: '=AND(logical1, [logical2], ...)', description: 'Returns TRUE if all arguments are TRUE', example: '=AND(A1>5, B1<10)', category: 'logical' },
    { name: 'OR', syntax: '=OR(logical1, [logical2], ...)', description: 'Returns TRUE if any argument is TRUE', example: '=OR(A1>5, B1<10)', category: 'logical' },
    { name: 'NOT', syntax: '=NOT(logical)', description: 'Reverses the logic of its argument', example: '=NOT(A1>5)', category: 'logical' },
    { name: 'IFERROR', syntax: '=IFERROR(value, value_if_error)', description: 'Returns a value if error, otherwise returns value', example: '=IFERROR(A1/B1, "Error")', category: 'logical' },

    // Text
    { name: 'CONCATENATE', syntax: '=CONCATENATE(text1, [text2], ...)', description: 'Joins several text strings', example: '=CONCATENATE(A1, " ", B1)', category: 'text' },
    { name: 'LEFT', syntax: '=LEFT(text, [num_chars])', description: 'Returns leftmost characters', example: '=LEFT(A1, 3)', category: 'text' },
    { name: 'RIGHT', syntax: '=RIGHT(text, [num_chars])', description: 'Returns rightmost characters', example: '=RIGHT(A1, 3)', category: 'text' },
    { name: 'MID', syntax: '=MID(text, start_num, num_chars)', description: 'Returns characters from the middle', example: '=MID(A1, 2, 3)', category: 'text' },
    { name: 'UPPER', syntax: '=UPPER(text)', description: 'Converts text to uppercase', example: '=UPPER(A1)', category: 'text' },
    { name: 'LOWER', syntax: '=LOWER(text)', description: 'Converts text to lowercase', example: '=LOWER(A1)', category: 'text' },
    { name: 'TRIM', syntax: '=TRIM(text)', description: 'Removes extra spaces from text', example: '=TRIM(A1)', category: 'text' },
    { name: 'LEN', syntax: '=LEN(text)', description: 'Returns the length of text', example: '=LEN(A1)', category: 'text' },

    // Date & Time
    { name: 'TODAY', syntax: '=TODAY()', description: 'Returns current date', example: '=TODAY()', category: 'datetime' },
    { name: 'NOW', syntax: '=NOW()', description: 'Returns current date and time', example: '=NOW()', category: 'datetime' },
    { name: 'DATE', syntax: '=DATE(year, month, day)', description: 'Creates a date from year, month, day', example: '=DATE(2024, 1, 15)', category: 'datetime' },
    { name: 'YEAR', syntax: '=YEAR(serial_number)', description: 'Returns the year of a date', example: '=YEAR(A1)', category: 'datetime' },
    { name: 'MONTH', syntax: '=MONTH(serial_number)', description: 'Returns the month of a date', example: '=MONTH(A1)', category: 'datetime' },
    { name: 'DAY', syntax: '=DAY(serial_number)', description: 'Returns the day of a date', example: '=DAY(A1)', category: 'datetime' },
    { name: 'DATEDIF', syntax: '=DATEDIF(start_date, end_date, unit)', description: 'Calculates difference between dates', example: '=DATEDIF(A1, B1, "d")', category: 'datetime' },

    // Lookup & Reference
    { name: 'VLOOKUP', syntax: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])', description: 'Searches in first column and returns value', example: '=VLOOKUP(A1, B1:D10, 2, FALSE)', category: 'lookup' },
    { name: 'HLOOKUP', syntax: '=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])', description: 'Searches in first row and returns value', example: '=HLOOKUP(A1, B1:F5, 3, FALSE)', category: 'lookup' },
    { name: 'INDEX', syntax: '=INDEX(array, row_num, [column_num])', description: 'Returns value at intersection of row and column', example: '=INDEX(A1:C10, 2, 3)', category: 'lookup' },
    { name: 'MATCH', syntax: '=MATCH(lookup_value, lookup_array, [match_type])', description: 'Returns relative position of item', example: '=MATCH(A1, B1:B10, 0)', category: 'lookup' },
    { name: 'OFFSET', syntax: '=OFFSET(reference, rows, cols, [height], [width])', description: 'Returns a reference offset from starting cell', example: '=OFFSET(A1, 2, 3)', category: 'lookup' },

    // Financial
    { name: 'PMT', syntax: '=PMT(rate, nper, pv, [fv], [type])', description: 'Calculates loan payment', example: '=PMT(0.05/12, 60, 10000)', category: 'financial' },
    { name: 'FV', syntax: '=FV(rate, nper, pmt, [pv], [type])', description: 'Calculates future value of investment', example: '=FV(0.06/12, 10*12, -100, -1000)', category: 'financial' },
    { name: 'PV', syntax: '=PV(rate, nper, pmt, [fv], [type])', description: 'Calculates present value of investment', example: '=PV(0.08/12, 10*12, -100)', category: 'financial' },
    { name: 'NPV', syntax: '=NPV(rate, value1, [value2], ...)', description: 'Calculates net present value', example: '=NPV(0.1, A1:A5)', category: 'financial' },
    { name: 'IRR', syntax: '=IRR(values, [guess])', description: 'Calculates internal rate of return', example: '=IRR(A1:A5)', category: 'financial' },
  ]

  const filteredFormulas = formulas.filter((formula) => {
    const matchesCategory = selectedCategory === 'all' || formula.category === selectedCategory
    const matchesSearch = formula.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formula.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)',
            fontSize: '0.875rem',
          }}
        >
          <option value="all">{l.allCategories}</option>
          <option value="math">{l.math}</option>
          <option value="statistical">{l.statistical}</option>
          <option value="logical">{l.logical}</option>
          <option value="text">{l.text}</option>
          <option value="datetime">{l.dateTime}</option>
          <option value="lookup">{l.lookup}</option>
          <option value="financial">{l.financial}</option>
        </select>

        <input
          type="text"
          placeholder={l.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)',
            fontSize: '0.875rem',
          }}
        />
      </div>

      {/* Formula List */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {filteredFormulas.length > 0 ? (
          filteredFormulas.map((formula, index) => (
            <div
              key={index}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>
                  {formula.name}
                </h3>
                <CopyButton
                  text={formula.syntax}
                  label={l.copy}
                  copiedLabel={l.copied}
                />
              </div>

              <div className="mb-2">
                <strong className="text-sm text-[var(--color-text-secondary)]">
                  {l.syntax}:
                </strong>
                <code
                  style={{
                    display: 'block',
                    marginTop: '0.25rem',
                    padding: '0.5rem',
                    backgroundColor: 'var(--color-bg)',
                    borderRadius: '0.25rem',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {formula.syntax}
                </code>
              </div>

              <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                {formula.description}
              </p>

              <div>
                <strong className="text-sm text-[var(--color-text-secondary)]">
                  {l.example}:
                </strong>
                <code
                  style={{
                    display: 'block',
                    marginTop: '0.25rem',
                    padding: '0.5rem',
                    backgroundColor: 'var(--color-bg)',
                    borderRadius: '0.25rem',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    border: '1px solid var(--color-border)',
                    color: 'rgb(34, 197, 94)',
                  }}
                >
                  {formula.example}
                </code>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              padding: '3rem 1rem',
              textAlign: 'center',
              color: 'var(--color-text-secondary)',
              border: '2px dashed var(--color-border)',
              borderRadius: '0.5rem',
            }}
          >
            {l.noResults}
          </div>
        )}
      </div>
    </div>
  )
}
