'use client'

import { useState } from 'react'
import { Calculator as CalculatorIcon, DollarSign, Calendar, Car } from 'lucide-react'
import { CalculationInputs } from '@/lib/calculations'

interface CalculatorProps {
  onCalculate: (inputs: CalculationInputs) => void
}

export default function Calculator({ onCalculate }: CalculatorProps) {
  const [monthlyDays, setMonthlyDays] = useState(15)
  const [dailyRate, setDailyRate] = useState(150)
  const [carCount, setCarCount] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCalculate({ monthlyDays, dailyRate, carCount })
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-500/20 rounded-lg">
          <CalculatorIcon className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">Calculate Your Escape</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Monthly Rental Days */}
        <div>
          <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-3">
            <Calendar className="w-4 h-4" />
            Days Rented Per Month
          </label>
          <input
            type="range"
            min="1"
            max="30"
            value={monthlyDays}
            onChange={(e) => setMonthlyDays(Number(e.target.value))}
            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between mt-2">
            <span className="text-slate-400 text-sm">1 day</span>
            <span className="text-emerald-400 font-semibold">{monthlyDays} days</span>
            <span className="text-slate-400 text-sm">30 days</span>
          </div>
        </div>

        {/* Daily Rate */}
        <div>
          <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-3">
            <DollarSign className="w-4 h-4" />
            Average Daily Rate
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
            <input
              type="number"
              min="50"
              max="2000"
              value={dailyRate}
              onChange={(e) => setDailyRate(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-8 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Number of Cars */}
        <div>
          <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-3">
            <Car className="w-4 h-4" />
            Number of Cars
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 5, 10].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setCarCount(num)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  carCount === num
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/25"
        >
          Calculate My Earnings
        </button>
      </form>
    </div>
  )
}