'use client'

/**
 * The browser's own print dialog is the PDF exporter — "Save as PDF" there uses
 * the @media print rules in globals.css. No library, no server, works offline.
 */
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-sm border border-ink/25 px-3 py-1.5 text-sm text-ink/75 transition-colors hover:border-ink hover:text-ink print:hidden"
    >
      Save as PDF
    </button>
  )
}
