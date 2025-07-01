import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"
import { useId, useState, type ComponentProps } from "react"
import type { DateRange } from "react-day-picker"
import { Button } from "../raw/button"
import { Calendar } from "../raw/calendar"
import { Label } from "../raw/label"
import { Popover, PopoverContent, PopoverTrigger } from "../raw/popover"



type InputDateRangePropsT = {
  label?: string
  dtRange: DateRange | undefined
  setDtRangeFn: (dtRange: DateRange | undefined) => void
} & ComponentProps<typeof Calendar>


export function InputDateRange({
  label,
  dtRange,
  setDtRangeFn,
  className
}: InputDateRangePropsT) {

  const [open, setOpen] = useState(false)
  const inputId = useId()


  return (


    <div className={cn("flex flex-col w-full", className)}>

      {label && (
        <Label htmlFor={inputId} className="my-0.5 ml-0.5 font-normal text-muted-foreground text-sm">
          {label}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={inputId}
            variant="outline"
            className="justify-between w-full font-normal"
          >
            {dtRange
              ? `${dtRange.from?.toLocaleDateString()} - ${dtRange.from?.toLocaleDateString()}`
              : 'Select date'
            }
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="p-0 w-full min-w-80 overflow-hidden"
          align="start"
        >
          <Calendar
            mode="range"
            captionLayout="dropdown"
            defaultMonth={dtRange?.from}
            numberOfMonths={2}
            selected={dtRange}
            onSelect={(dateRange) => setDtRangeFn(dateRange)}
          />
        </PopoverContent>

      </Popover>

    </div>

  )
}
