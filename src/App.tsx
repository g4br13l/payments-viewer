import { Toaster } from "sonner";
import { InputCalendar } from "./components/base/inputCalendar";
import { InputSearch } from "./components/base/inputSearch";
import { PaymentTable } from "./components/base/paymentTable";
import { usePayments } from "./hooks/usePayments";
import { txtNormalize } from "./lib/dataUtils";




export default function App() {

  const { initPayments, payments, setPayments, isLoading } = usePayments()

  const handleTextSearchChange = (searchText: string) => {
    if (!searchText) return setPayments(initPayments)
    const searchRes = initPayments.filter(
      p => txtNormalize(p.description).startsWith(txtNormalize(searchText))
    )
    setPayments(searchRes)
  }

  console.log('(app):', { payments })



  return (

    <main className="flex flex-col gap-6 mx-8">
      <Toaster />

      <h1> Payment List</h1>

      <div className="flex flex-row justify-between items-center">

        <InputSearch
          searchFn={handleTextSearchChange}
          label="Search text"
        />
        <InputCalendar
          label="Filter by date"
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

