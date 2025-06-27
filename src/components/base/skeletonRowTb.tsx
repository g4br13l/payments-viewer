
import { Skeleton } from "../raw/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../raw/table";




type TbCellsPropsT = {
  colNumber: number
}

function TbCells({ colNumber }: TbCellsPropsT) {
  return (
    [...Array(colNumber)].map((_, i) => (
      <TableCell key={i}>
        <Skeleton className="my-2 w-full h-4" />
      </TableCell>
    ))
  )
}



type SkeletonRowTbPropsT = {
  headers: string[]
}

export function SkeletonRowTb({ headers }: SkeletonRowTbPropsT) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map(h => (
              <TableHead key={h}> {h} </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TbCells colNumber={headers.length} />
          </TableRow>
          <TableRow>
            <TbCells colNumber={headers.length} />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
