


export type PaymentT = {
  id: number
  description: string
  date: string
  amount: number
}

export const tbPaymentCols = ['id', 'description', 'date', 'amount'] as const
export type TbPaymentColsT = typeof tbPaymentCols
export type TbPaymentColT = keyof PaymentT

export type DataOrderT = 'asc' | 'desc'
export type TbDataOrderT = {
  order: DataOrderT
  tbCol: string
}


