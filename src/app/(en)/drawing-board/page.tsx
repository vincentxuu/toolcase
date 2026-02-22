import { Metadata } from 'next'
import DrawingBoard from '@/components/tools/DrawingBoard'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Drawing Board | Online Tool',
  description: 'Free online drawing tool. Support pen, eraser, color picker, line width adjustment. Undo/redo, clear canvas, download image. Pure frontend Canvas drawing, privacy safe.',
  keywords: ['online drawing', 'drawing tool', 'Canvas drawing', 'paint tool', 'sketch board', 'doodle'],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold">Drawing Board</h1>
        <p className="mb-8 text-muted-foreground">
          Simple and easy-to-use online drawing tool! Using Canvas technology for smooth drawing experience. Support pen and eraser tools, custom colors, line width adjustment. Undo/redo function available, download as PNG image when done. All processing in browser, privacy protected.
        </p>
        <DrawingBoard
          labels={{
            tool: 'Tool',
            pen: 'Pen',
            eraser: 'Eraser',
            color: 'Color',
            size: 'Size',
            clear: 'Clear',
            download: 'Download',
            undo: 'Undo',
            redo: 'Redo',
            confirmClear: 'Clear the canvas?',
          }}
        />
      </div>
    </main>
  )
}
