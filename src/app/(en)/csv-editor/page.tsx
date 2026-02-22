import { Metadata } from 'next'
import CsvEditor from '@/components/tools/CsvEditor'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'CSV Editor - Edit CSV Files Online in Spreadsheet | toolcase',
  description: 'Edit CSV files in a visual spreadsheet interface. Add, delete, modify rows and columns. Support multiple delimiters. Download edited CSV. Free browser tool.',
  alternates: { canonical: 'https://toolcase.cc/csv-editor', languages: { en: 'https://toolcase.cc/csv-editor', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/csv-editor' } },
}

const faqs = [
  { question: 'How do I edit a CSV file?', answer: 'Upload your CSV file or paste the CSV data, then click "Parse CSV". The data will appear in an editable table where you can click any cell to modify its content. Use the buttons to add or remove rows and columns.' },
  { question: 'What delimiters are supported?', answer: 'The editor supports comma (,), semicolon (;), tab, and pipe (|) delimiters. Select your delimiter from the dropdown before parsing. Different regions use different delimiters - Europe often uses semicolons while North America uses commas.' },
  { question: 'Can I add or remove rows and columns?', answer: 'Yes! Use the "Add Row" and "Add Column" buttons to append new rows/columns at the end. Use "Delete Last Row" and "Delete Last Column" to remove them. You can freely modify the table structure as needed.' },
  { question: 'How do I save my edited CSV?', answer: 'Click the "Download CSV" button to download the edited data as a CSV file, or use the "Copy" button to copy it to your clipboard. The output will use the delimiter you selected.' },
]

export default function CsvEditorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'CSV Editor', url: 'https://toolcase.cc/csv-editor' },
        ]}
      />
      <ToolSchema
        name="CSV Editor"
        description="Edit CSV files in a visual spreadsheet interface. Add, delete, modify rows and columns. Support multiple delimiters. Download edited CSV. Free browser tool."
        url="https://toolcase.cc/csv-editor"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'CSV Editor' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>CSV Editor</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Edit CSV files visually in a spreadsheet interface with full editing capabilities.</p>
      <CsvEditor
        labels={{
          title: 'CSV Editor',
          pasteOrUpload: 'Paste or Upload CSV',
          uploadFile: 'Upload CSV File',
          csvInput: 'CSV Data',
          inputPlaceholder: 'Paste CSV data here...',
          parse: 'Parse CSV',
          clear: 'Clear',
          download: 'Download CSV',
          copy: 'Copy',
          copied: 'Copied!',
          addRow: 'Add Row',
          addColumn: 'Add Column',
          deleteRow: 'Delete Last Row',
          deleteColumn: 'Delete Last Column',
          hasHeaders: 'First row is headers',
          delimiter: 'Delimiter',
          comma: 'Comma (,)',
          semicolon: 'Semicolon (;)',
          tab: 'Tab',
          pipe: 'Pipe (|)',
          invalidCsv: 'Invalid CSV data',
          noData: 'No data to display',
          pasteInstructions: 'Paste CSV data or upload a file to start editing',
          row: 'Row',
          column: 'Column',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          Upload a CSV file or paste CSV text into the input area. Select the appropriate delimiter (comma, semicolon, tab, or pipe) and check "First row is headers" if your data has a header row. Click "Parse CSV" to load the data into the editable table.
        </p>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Edit cells by clicking on them and typing. Add rows or columns using the respective buttons. When finished, download the edited CSV file or copy the data to your clipboard. The tool works entirely in your browser - your data never leaves your device.
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="csv-editor" locale="en" />
    </div>
    </>
  )
}
