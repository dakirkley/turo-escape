export interface CalculationInputs {
  monthlyDays: number
  dailyRate: number
  carCount: number
}

export interface CalculationResults {
  monthlyRevenue: number
  turoCommission: number
  turoNet: number
  privateProcessing: number
  privateNet: number
  monthlySavings: number
  yearlySavings: number
  threeYearSavings: number
}

const TURO_COMMISSION_RATE = 0.30
const PRIVATE_PROCESSING_RATE = 0.05

export function calculateEarnings(inputs: CalculationInputs): CalculationResults {
  const monthlyRevenue = inputs.monthlyDays * inputs.dailyRate * inputs.carCount
  
  const turoCommission = monthlyRevenue * TURO_COMMISSION_RATE
  const turoNet = monthlyRevenue - turoCommission
  
  const privateProcessing = monthlyRevenue * PRIVATE_PROCESSING_RATE
  const privateNet = monthlyRevenue - privateProcessing
  
  const monthlySavings = privateNet - turoNet
  const yearlySavings = monthlySavings * 12
  const threeYearSavings = yearlySavings * 3

  return {
    monthlyRevenue,
    turoCommission,
    turoNet,
    privateProcessing,
    privateNet,
    monthlySavings,
    yearlySavings,
    threeYearSavings,
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}