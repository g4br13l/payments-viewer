import { Toaster } from "sonner";
import { InputDateRange } from "./components/base/inputDateRange";
import { InputSearch } from "./components/base/inputSearch";
import { PaymentTable } from "./components/base/paymentTable";
import { usePayments } from "./hooks/usePayments";




export default function App() {

  const {
    /* initPayments,
    payments, */
    filteredPayments: payments,
    setPayments,
    filters,
    dtRange,
    isLoading
  } = usePayments()


  console.log('(App) payments:', { payments, dtRange })


  return (

    <main className="flex flex-col gap-6 mx-8">
      <Toaster />

      <h1> Payment List</h1>

      <div className="flex sm:flex-row flex-col justify-between items-center gap-6">

        <InputSearch
          setSearchTextFn={filters.setSearchText}
          label="Search text"
        />
        <InputDateRange
          className="w-full sm:w-fit min-w-50"
          label="Filter by date"
          dtRange={dtRange}
          setDtRangeFn={filters.setDtRange}
        />
      </div>

      <PaymentTable
        payments={payments}
        setPaymentsFn={setPayments}
        isLoading={isLoading}
      />

    </main>

  )
}

