'use client'
import { useState, useCallback } from 'react'
import Papa from 'papaparse'
import CopyButton from '@/components/shared/CopyButton'

interface CsvEditorProps {
  labels?: {
    title: string
    pasteOrUpload: string
    uploadFile: string
    csvInput: string
    inputPlaceholder: string
    parse: string
    clear: string
    download: string
    copy: string
    copied: string
    addRow: string
    addColumn: string
    deleteRow: string
    deleteColumn: string
    hasHeaders: string
    delimiter: string
    comma: string
    semicolon: string
    tab: string
    pipe: string
    invalidCsv: string
    noData: string
    pasteInstructions: string
    row: string
    column: string
  }
}

export default function CsvEditor({ labels }: CsvEditorProps) {
  const l = {
    title: labels?.title ?? 'CSV Editor',
    pasteOrUpload: labels?.pasteOrUpload ?? 'Paste or Upload CSV',
    uploadFile: labels?.uploadFile ?? 'Upload CSV File',
    csvInput: labels?.csvInput ?? 'CSV Data',
    inputPlaceholder: labels?.inputPlaceholder ?? 'Paste CSV data here...',
    parse: labels?.parse ?? 'Parse CSV',
    clear: labels?.clear ?? 'Clear',
    download: labels?.download ?? 'Download CSV',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    addRow: labels?.addRow ?? 'Add Row',
    addColumn: labels?.addColumn ?? 'Add Column',
    deleteRow: labels?.deleteRow ?? 'Delete Last Row',
    deleteColumn: labels?.deleteColumn ?? 'Delete Last Column',
    hasHeaders: labels?.hasHeaders ?? 'First row is headers',
    delimiter: labels?.delimiter ?? 'Delimiter',
    comma: labels?.comma ?? 'Comma (,)',
    semicolon: labels?.semicolon ?? 'Semicolon (;)',
    tab: labels?.tab ?? 'Tab',
    pipe: labels?.pipe ?? 'Pipe (|)',
    invalidCsv: labels?.invalidCsv ?? 'Invalid CSV data',
    noData: labels?.noData ?? 'No data to display',
    pasteInstructions: labels?.pasteInstructions ?? 'Paste CSV data or upload a file to start editing',
    row: labels?.row ?? 'Row',
    column: labels?.column ?? 'Column',
  }

  const [csvInput, setCsvInput] = useState('')
  const [data, setData] = useState<string[][]>([])
  const [hasHeaders, setHasHeaders] = useState(true)
  const [delimiter, setDelimiter] = useState(',')
  const [error, setError] = useState('')

  const handleParse = useCallback(() => {
    if (!csvInput.trim()) return

    try {
      const result = Papa.parse(csvInput.trim(), {
        delimiter,
        skipEmptyLines: true,
      })

      if (result.errors.length > 0) {
        setError(`${l.invalidCsv}: ${result.errors[0].message}`)
        return
      }

      setData(result.data as string[][])
      setError('')
    } catch (e) {
      setError(`${l.invalidCsv}: ${(e as Error).message}`)
    }
  }, [csvInput, delimiter, l.invalidCsv])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const text = reader.result as string
      setCsvInput(text)
    }
    reader.readAsText(file)
    e.target.value = ''
  }, [])

  const handleCellChange = useCallback((rowIndex: number, colIndex: number, value: string) => {
    setData((prev) => {
      const newData = [...prev]
      newData[rowIndex] = [...newData[rowIndex]]
      newData[rowIndex][colIndex] = value
      return newData
    })
  }, [])

  const handleAddRow = useCallback(() => {
    if (data.length === 0) return
    const colCount = data[0]?.length || 1
    const newRow = Array(colCount).fill('')
    setData((prev) => [...prev, newRow])
  }, [data])

  const handleAddColumn = useCallback(() => {
    setData((prev) => prev.map((row) => [...row, '']))
  }, [])

  const handleDeleteRow = useCallback(() => {
    if (data.length <= (hasHeaders ? 1 : 0)) return
    setData((prev) => prev.slice(0, -1))
  }, [data, hasHeaders])

  const handleDeleteColumn = useCallback(() => {
    if (data.length === 0 || data[0].length <= 1) return
    setData((prev) => prev.map((row) => row.slice(0, -1)))
  }, [data])

  const handleDownload = useCallback(() => {
    const csv = Papa.unparse(data, { delimiter })
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'edited-data.csv'
    link.click()
    URL.revokeObjectURL(link.href)
  }, [data, delimiter])

  const handleClear = useCallback(() => {
    setCsvInput('')
    setData([])
    setError('')
  }, [])

  const getCsvOutput = useCallback(() => {
    return Papa.unparse(data, { delimiter })
  }, [data, delimiter])

  const headers = hasHeaders && data.length > 0 ? data[0] : null
  const tableData = hasHeaders && data.length > 0 ? data.slice(1) : data

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Input Section */}
      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          {l.pasteOrUpload}
        </h3>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn-primary" onClick={handleParse}>
            {l.parse}
          </button>
          <button className="btn-secondary" onClick={handleClear}>
            {l.clear}
          </button>
          <label
            className="btn-secondary"
            style={{ margin: 0, cursor: 'pointer' }}
          >
            {l.uploadFile}
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={hasHeaders}
                onChange={(e) => setHasHeaders(e.target.checked)}
              />
              {l.hasHeaders}
            </label>

            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
              }}
            >
              <option value=",">{l.comma}</option>
              <option value=";">{l.semicolon}</option>
              <option value="\t">{l.tab}</option>
              <option value="|">{l.pipe}</option>
            </select>
          </div>
        </div>

        <textarea
          className="tool-textarea"
          style={{ minHeight: '120px', fontFamily: 'monospace', fontSize: '0.875rem' }}
          placeholder={l.inputPlaceholder}
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
        />
      </div>

      {/* Error Display */}
      {error && (
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--color-error)',
            fontSize: '0.875rem',
          }}
        >
          {error}
        </div>
      )}

      {/* Table Editor */}
      {data.length > 0 ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>
              {l.csvInput} ({data.length} × {data[0]?.length || 0})
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button className="btn-secondary" style={{ fontSize: '0.875rem' }} onClick={handleAddRow}>
                {l.addRow}
              </button>
              <button className="btn-secondary" style={{ fontSize: '0.875rem' }} onClick={handleAddColumn}>
                {l.addColumn}
              </button>
              <button className="btn-secondary" style={{ fontSize: '0.875rem' }} onClick={handleDeleteRow}>
                {l.deleteRow}
              </button>
              <button className="btn-secondary" style={{ fontSize: '0.875rem' }} onClick={handleDeleteColumn}>
                {l.deleteColumn}
              </button>
              <button className="btn-primary" style={{ fontSize: '0.875rem' }} onClick={handleDownload}>
                {l.download}
              </button>
              <CopyButton text={getCsvOutput()} label={l.copy} copiedLabel={l.copied} />
            </div>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid var(--color-border)', borderRadius: '0.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              {headers && (
                <thead>
                  <tr>
                    <th style={{ padding: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', fontWeight: 600, fontSize: '0.75rem' }}>
                      #
                    </th>
                    {headers.map((header, colIndex) => (
                      <th
                        key={colIndex}
                        style={{
                          padding: '0.5rem',
                          backgroundColor: 'var(--color-bg-secondary)',
                          border: '1px solid var(--color-border)',
                          fontWeight: 600,
                          minWidth: '100px',
                        }}
                      >
                        <input
                          type="text"
                          value={header}
                          onChange={(e) => handleCellChange(0, colIndex, e.target.value)}
                          style={{
                            width: '100%',
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: 'var(--color-text)',
                            fontWeight: 600,
                          }}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td
                      style={{
                        padding: '0.5rem',
                        backgroundColor: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border)',
                        fontWeight: 600,
                        textAlign: 'center',
                        fontSize: '0.75rem',
                        color: 'var(--color-text-tertiary)',
                      }}
                    >
                      {hasHeaders ? rowIndex + 1 : rowIndex}
                    </td>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} style={{ padding: '0.25rem', border: '1px solid var(--color-border)' }}>
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => handleCellChange(hasHeaders ? rowIndex + 1 : rowIndex, colIndex, e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.25rem',
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: 'var(--color-text)',
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
          {l.pasteInstructions}
        </div>
      )}
    </div>
  )
}
