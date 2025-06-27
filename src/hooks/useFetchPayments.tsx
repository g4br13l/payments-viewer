import type { PaymentT } from "@/types/payment"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"



const URL = {
  base: 'http://localhost:3001',
  payments: 'payments'
} as const


export function useFetchPayments() {


  const [payments, setPayments] = useState<PaymentT[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const initPaymentsRef = useRef<PaymentT[]>([])

  if (payments.length && initPaymentsRef.current.length === 0) {
    initPaymentsRef.current = payments
  }

  useEffect(() => {
    setIsLoading(true)
    const fetchPayments = async () => {
      try {
        const res = await fetch(`${URL.base}/${URL.payments}`, { method: 'GET' }).then(r => r)
        const resObj: PaymentT[] = await res.json()
        setPayments(resObj)
        setIsLoading(false)
      }
      catch (err) {
        console.error('Error while fetch the payments data:', (err as Error).message)
        toast.error("Something wrong", {
          description: "Something wrong while fetching payments",
        })
      }
    }
    fetchPayments()
  }, [])

  return { payments, setPayments, isLoading, initPayments: initPaymentsRef.current }
}
