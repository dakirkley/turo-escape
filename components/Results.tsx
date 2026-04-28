'use client'

import { CalculationResults, formatCurrency } from '@/lib/calculations'
import { TrendingUp, Download, ArrowRight } from 'lucide-react'

interface ResultsProps {
  results: CalculationResults
  onReset: () => void
}

export default function Results({ results, onReset }: ResultsProps) {
  return (
    <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <TrendingUp className="w-4 h-4" />
          Your Potential Savings
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
          You'd make{' '}
          <span className="text-emerald-400">
            {formatCurrency(results.yearlySavings)}
          </span>
          {' '}more per year
        </h3>
        <p className="text-slate-400">
          By taking your rental business private instead of using Turo
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-slate-900 rounded-xl overflow-hidden mb-8">
        <div className="grid grid-cols-3 gap-4 p-4 border-b border-slate-700 font-medium text-slate-300">
          <div>Metric</div>
          <div className="text-center">With Turo</div>
          <div className="text-center text-emerald-400">Going Private</div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 p-4 border-b border-slate-700/50">
          <div className="text-slate-400">Monthly Revenue</div>
          <div className="text-center text-white">{formatCurrency(results.monthlyRevenue)}</div>
          <div className="text-center text-white">{formatCurrency(results.monthlyRevenue)}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 p-4 border-b border-slate-700/50">
          <div className="text-slate-400">Platform Fees</div>
          <div className="text-center text-red-400">-{formatCurrency(results.turoCommission)}</div>
          <div className="text-center text-emerald-400">-{formatCurrency(results.privateProcessing)}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 p-4 bg-slate-800/50">
          <div className="text-slate-300 font-medium">Net Monthly</div>
          <div className="text-center text-white font-semibold">{formatCurrency(results.turoNet)}</div>
          <div className="text-center text-emerald-400 font-semibold">{formatCurrency(results.privateNet)}</div>
        </div>
      </div>

      {/* Projections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900 rounded-xl p-6 text-center">
          <div className="text-slate-400 text-sm mb-1">Monthly Savings</div>
          <div className="text-2xl font-bold text-emerald-400">{formatCurrency(results.monthlySavings)}</div>
        </div>
        <div className="bg-slate-900 rounded-xl p-6 text-center">
          <div className="text-slate-400 text-sm mb-1">Yearly Savings</div>
          <div className="text-2xl font-bold text-emerald-400">{formatCurrency(results.yearlySavings)}</div>
        </div>
        <div className="bg-slate-900 rounded-xl p-6 text-center border-2 border-emerald-500/30">
          <div className="text-slate-400 text-sm mb-1">3-Year Savings</div>
          <div className="text-2xl font-bold text-emerald-400">{formatCurrency(results.threeYearSavings)}</div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25">
          <Download className="w-5 h-5" />
          Get The Complete Guide
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors py-4 px-6"
        >
          Calculate Again
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}