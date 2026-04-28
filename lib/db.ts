// Simple in-memory database for MVP
// In production, replace with real database (PostgreSQL, MongoDB, etc.)

export interface Lead {
  id: string
  email: string
  carCount: number
  monthlyDays: number
  dailyRate: number
  turoCommission: number
  calculatedMonthlyLoss: number
  calculatedYearlyLoss: number
  createdAt: string
  source: string
}

// In-memory storage
const leads: Lead[] = []

export function createLead(leadData: Omit<Lead, 'id' | 'createdAt'> & { id?: string; createdAt?: string }): Lead {
  const lead: Lead = {
    ...leadData,
    id: leadData.id || crypto.randomUUID(),
    createdAt: leadData.createdAt || new Date().toISOString(),
    source: leadData.source || 'direct',
  } as Lead
  
  leads.push(lead)
  return lead
}

export function getAllLeads(): Lead[] {
  return [...leads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getLeadStats(): { total: number; avgYearlyLoss: number } {
  const total = leads.length
  const avgYearlyLoss = total > 0 
    ? leads.reduce((sum, lead) => sum + lead.calculatedYearlyLoss, 0) / total 
    : 0
  
  return { total, avgYearlyLoss }
}