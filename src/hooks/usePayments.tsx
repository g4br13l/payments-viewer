import { txtNormalize } from "@/lib/dataUtils"
import { pipe } from "@/lib/functionalPg"
import type { PaymentT } from "@/types/payment"
import { useEffect, useMemo, useRef, useState } from "react"
import type { DateRange } from "react-day-picker"
import { toast } from "sonner"




const URL = {
  base: 'http://localhost:3001',
  payments: 'payments'
} as const


export function usePayments() {


  const [payments, setPayments] = useState<PaymentT[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchText, setSearchText] = useState<string>('')
  const [dtRange, setDtRange] = useState<DateRange>()

  console.log('(usePayments):', { searchText, dtRange })

  const initPaymentsRef = useRef<PaymentT[]>([])
  if (payments.length && initPaymentsRef.current.length === 0) {
    initPaymentsRef.current = payments
  }


  function searchByText(_payments: PaymentT[], searchText: string | undefined) {
    return !searchText ? _payments : _payments.filter(
      (p) => txtNormalize(p.description).includes(txtNormalize(searchText))
    )
  }


  function filterByDtRange(_payments: PaymentT[], dtRange: DateRange | undefined) {
    if (!dtRange?.to || !dtRange.from) return _payments
    const dtFrom = dtRange.from
    const dtTo = dtRange.to
    return _payments.filter(p => {
      const payDate = new Date(p.date)
      return payDate >= dtFrom && payDate <= dtTo
    })
  }

  const filteredPayments = useMemo(() => pipe<PaymentT[]>(
    (p) => searchByText(p, searchText),
    (p) => filterByDtRange(p, dtRange)
  )(payments), [payments, searchText, dtRange])


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



  return {
    initPayments: initPaymentsRef.current,
    payments,
    filteredPayments,
    dtRange,
    setPayments,
    isLoading,
    filters: {
      setSearchText,
      setDtRange
    }
  }
}
