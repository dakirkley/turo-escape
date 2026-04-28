import { NextRequest, NextResponse } from 'next/server'
import { createLead, getAllLeads, getLeadStats } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const lead = createLead({
      email: body.email,
      carCount: body.carCount,
      monthlyDays: body.monthlyDays,
      dailyRate: body.dailyRate,
      turoCommission: body.turoCommission,
      calculatedMonthlyLoss: body.calculatedMonthlyLoss,
      calculatedYearlyLoss: body.calculatedYearlyLoss,
      source: body.source || 'website',
    })

    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('Failed to create lead:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const leads = getAllLeads()
    const stats = getLeadStats()
    
    return NextResponse.json({ leads, stats })
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}