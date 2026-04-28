'use client'

import { Lead } from '@/lib/db'
import { formatCurrency } from '@/lib/calculations'
import { Download, Trash2 } from 'lucide-react'

interface LeadTableProps {
  leads: Lead[]
  onExport: () => void
}

export default function LeadTable({ leads, onExport }: LeadTableProps) {
  const handleExport = () => {
    const headers = ['Email', 'Cars', 'Days/Month', 'Daily Rate', 'Yearly Loss', 'Date', 'Source']
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        lead.email,
        lead.carCount,
        lead.monthlyDays,
        lead.dailyRate,
        lead.calculatedYearlyLoss.toFixed(2),
        new Date(lead.createdAt).toLocaleDateString(),
        lead.source
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">
          Leads ({leads.length})
        </h3>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="text-left text-slate-400 text-sm font-medium px-4 py-3">Email</th>
              <th className="text-left text-slate-400 text-sm font-medium px-4 py-3">Cars</th>
              <th className="text-left text-slate-400 text-sm font-medium px-4 py-3">Days/Month</th>
              <th className="text-left text-slate-400 text-sm font-medium px-4 py-3">Rate</th>
              <th className="text-left text-slate-400 text-sm font-medium px-4 py-3">Yearly Loss</th>
              <th className="text-left text-slate-400 text-sm font-medium px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-4 py-3 text-white">{lead.email}</td>
                <td className="px-4 py-3 text-slate-300">{lead.carCount}</td>
                <td className="px-4 py-3 text-slate-300">{lead.monthlyDays}</td>
                <td className="px-4 py-3 text-slate-300">${lead.dailyRate}</td>
                <td className="px-4 py-3 text-emerald-400 font-medium">
                  {formatCurrency(lead.calculatedYearlyLoss)}
                </td>
                <td className="px-4 py-3 text-slate-400 text-sm">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  No leads yet. Share your calculator to start collecting!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}