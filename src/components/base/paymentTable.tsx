import { useState } from 'react';

import { capitalizeFirst, sortOrderCalc } from "@/lib/dataUtils";
import { tbPaymentCols, type DataOrderT, type PaymentT, type TbDataOrderT, type TbPaymentColT } from "@/types/payment";
import { ArrowDown, ArrowUp } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../raw/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../raw/table";
import { SkeletonRowTb } from "./skeletonRowTb";
import { cn } from '@/lib/utils';



type TbHeadPropsT = {
  handleSortClickFn: (col: TbPaymentColT, sort: TbDataOrderT) => void
}

function TbHead({ handleSortClickFn }: TbHeadPropsT) {

  const [sort, setSort] = useState<TbDataOrderT>({ order: 'asc', tbCol: 'id' })

  const handleToggleOrderClick = (tbCol: TbPaymentColT, currSort: TbDataOrderT) => {
    const newSort: TbDataOrderT = { ...currSort, order: currSort.order === 'asc' ? 'desc' : 'asc' }
    setSort(newSort)
    handleSortClickFn(tbCol, newSort)
  }

  return (
    <TableHeader>
      <TableRow>
        {tbPaymentCols.map(tbCol => (
          <TableHead key={tbCol}>
            <div className="flex flex-row items-center gap-1">
              {capitalizeFirst(tbCol)}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggleOrderClick(tbCol, sort)}
              >
                {sort.order === 'asc' ? (
                  <ArrowDown
                    size="16"
                    className={cn(sort.tbCol !== tbCol && 'text-ring')}
                  />
                ) : (
                  <ArrowUp
                    size="16"
                    className={cn(sort.tbCol !== tbCol && 'text-ring')}
                  />
                )}
              </Button>
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}




type PaymentTablePropsT = {
  payments: PaymentT[]
  setPaymentsFn: Dispatch<SetStateAction<PaymentT[]>>
  isLoading: boolean
  sort?: DataOrderT
}

export function PaymentTable({
  payments,
  setPaymentsFn,
  isLoading,
}: PaymentTablePropsT) {

  console.log('(PaymentTable):', { payments, isLoading })

  function handleSortClick(col: TbPaymentColT, sort: TbDataOrderT) {
    const sortedTbData = [...payments].sort(
      (payA, payB) => sortOrderCalc(payA[col], payB[col], sort.order)
    )
    setPaymentsFn(sortedTbData)
  }


  return (
    <section>
      {isLoading ? (
        <SkeletonRowTb headers={[...tbPaymentCols]} />
      ) : (
        <Table>
          <TableCaption>Payment List</TableCaption>
          <TbHead
            handleSortClickFn={handleSortClick}
          />
          <TableBody>
            {payments.map(p => (
              <TableRow key={p.id}>
                <TableCell> {p.id} </TableCell>
                <TableCell> {p.description} </TableCell>
                <TableCell> {p.date} </TableCell>
                <TableCell> {p.amount} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  )
}
