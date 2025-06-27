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
  sort?: TbDataOrderT
  sortToggleFn: (col: TbPaymentColT) => void
}

function TbHead({ sort, sortToggleFn }: TbHeadPropsT) {

  console.log('(TbHead) sort:', sort)

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
                onClick={() => sortToggleFn(tbCol)}
              >
                {sort?.order === 'asc' ? (
                  <ArrowDown
                    size="16"
                    className={cn(sort.tbCol === tbCol ? 'text-primary' : 'text-ring')}
                  />
                ) : (
                  <ArrowUp
                    size="16"
                    className={cn(sort?.tbCol === tbCol ? 'text-primary' : 'text-ring')}
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


  const [sort, setSort] = useState<TbDataOrderT>()

  console.log('(PaymentTable):', { payments, sort })


  function handleSortClick(col: TbPaymentColT) {
    const _sort: TbDataOrderT = sort ?? { tbCol: 'id', order: 'desc' }
    const sortedTbData = [...payments].sort(
      (payA, payB) => sortOrderCalc(payA[col], payB[col], _sort.order)
    )
    const newSort: TbDataOrderT = { tbCol: col, order: _sort.order === 'asc' ? 'desc' : 'asc' }
    setPaymentsFn(sortedTbData)
    setSort(newSort)
    // console.log('(handleSortClick) :', { col, sort })
  }


  return (
    <section>
      {isLoading ? (
        <SkeletonRowTb headers={[...tbPaymentCols]} />
      ) : (
        <Table>
          <TableCaption>Payment List</TableCaption>
          <TbHead
            sort={sort}
            sortToggleFn={handleSortClick}
          />
          <TableBody>
            {payments.map(p => (
              <TableRow key={p.id}>
                <TableCell> {p.id} </TableCell>
                <TableCell> {p.description} </TableCell>
                <TableCell> {new Date(p.date).toLocaleDateString()} </TableCell>
                <TableCell> {p.amount} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  )
}
