'use client'

import { useState } from 'react'
import { Calculator as CalculatorIcon, TrendingUp, Shield, Users, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'
import Calculator from '@/components/Calculator'
import EmailGate from '@/components/EmailGate'
import Results from '@/components/Results'
import { CalculationInputs, CalculationResults, calculateEarnings } from '@/lib/calculations'

const painPoints = [
  {
    icon: TrendingUp,
    title: 'Turo Takes 25-40%',
    description: 'Every booking, Turo pockets a massive chunk of your hard-earned money. On a $200/day rental, that\'s $60-80 per day gone.',
  },
  {
    icon: Users,
    title: 'You Don\'t Own Your Customers',
    description: 'Turo controls the relationship. You can\'t market to past renters, build loyalty, or create repeat business.',
  },
  {
    icon: Shield,
    title: 'Strict Policies & Suspensions',
    description: 'One dispute, one bad review, one policy violation — and your income can disappear overnight.',
  },
]

const faqs = [
  {
    question: 'Is it legal to rent my cars outside of Turo?',
    answer: 'Absolutely. You own your vehicles. Turo is just a marketplace. Building your own private rental business is completely legal and many hosts are already doing it successfully.',
  },
  {
    question: 'How do I find customers without Turo?',
    answer: 'We\'ll show you exactly how in our free guide. Short answer: Google Business, local SEO, social media, partnerships with hotels/airports, and referral programs work incredibly well.',
  },
  {
    question: 'What about insurance?',
    answer: 'Several insurance providers specialize in private car rentals. We cover the best options in our guide, including some that offer better coverage than Turo at lower costs.',
  },
  {
    question: 'How much can I really save?',
    answer: 'Use our calculator above to see your exact numbers. Most luxury hosts save $10,000-50,000+ per year by going private.',
  },
  {
    question: 'Do I need a website?',
    answer: 'Not to start. Many hosts begin with just a booking calendar and payment link. We\'ll show you the simple tools to get started fast.',
  },
]

export default function Home() {
  const [showEmailGate, setShowEmailGate] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [calculationInputs, setCalculationInputs] = useState<CalculationInputs | null>(null)
  const [calculationResults, setCalculationResults] = useState<CalculationResults | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleCalculate = (inputs: CalculationInputs) => {
    setCalculationInputs(inputs)
    setShowEmailGate(true)
  }

  const handleEmailSubmit = async (email: string) => {
    if (!calculationInputs) return

    const results = calculateEarnings(calculationInputs)
    setCalculationResults(results)

    // Store lead in database
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          carCount: calculationInputs.carCount,
          monthlyDays: calculationInputs.monthlyDays,
          dailyRate: calculationInputs.dailyRate,
          turoCommission: 0.30,
          calculatedMonthlyLoss: results.monthlySavings,
          calculatedYearlyLoss: results.yearlySavings,
        }),
      })
    } catch (error) {
      console.error('Failed to save lead:', error)
    }

    setShowEmailGate(false)
    setShowResults(true)
  }

  const handleReset = () => {
    setShowResults(false)
    setCalculationInputs(null)
    setCalculationResults(null)
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" />
              For Turo Hosts Ready to Break Free
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Stop Giving Turo{' '}
              <span className="text-emerald-400">40%</span>{' '}
              of Your Money
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              Calculate exactly how much more you'd earn by taking your luxury car rental business private. 
              Keep your customers. Keep your profits.
            </p>
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-500/25"
            >
              <CalculatorIcon className="w-5 h-5" />
              See How Much You're Losing
            </a>
          </div>

          {/* Pain Points */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                  <point.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{point.title}</h3>
                <p className="text-slate-400">{point.description}</p>
              </div>
            ))}
          </div>

          {/* Calculator Section */}
          <section id="calculator" className="max-w-xl mx-auto mb-20">
            {!showResults ? (
              <Calculator onCalculate={handleCalculate} />
            ) : (
              calculationResults && (
                <Results results={calculationResults} onReset={handleReset} />
              )
            )}
          </section>

          {/* Email Gate Modal */}
          <EmailGate
            isOpen={showEmailGate}
            onClose={() => setShowEmailGate(false)}
            onSubmit={handleEmailSubmit}
          />

          {/* FAQ Section */}
          <section className="max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800 transition-colors"
                  >
                    <span className="font-semibold text-white">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6 text-slate-400">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 TuroEscape. Not affiliated with Turo.
          </p>
          <a
            href="/admin"
            className="text-slate-500 hover:text-slate-400 text-sm transition-colors"
          >
            Admin
          </a>
        </div>
      </footer>
    </main>
  )
}