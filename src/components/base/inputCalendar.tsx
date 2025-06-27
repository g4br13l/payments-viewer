import { ChevronDownIcon } from "lucide-react"
import { useId, useState, type ComponentProps } from "react"
import type { DateRange } from "react-day-picker"
import { Button } from "../raw/button"
import { Calendar } from "../raw/calendar"
import { Label } from "../raw/label"
import { Popover, PopoverContent, PopoverTrigger } from "../raw/popover"



type InputCalendarPropsT = {
  label?: string
} & ComponentProps<typeof Calendar>


export function InputCalendar({
  label,
}: InputCalendarPropsT) {

  /* const currData = new Date() */
  const [open, setOpen] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    /* {
      from: new Date(currData.getFullYear(), currData.getMonth() - 1, 1),
      to: new Date
    } */
  )

  const inputId = useId()


  return (

    <div className="flex flex-col">

      {label && (
        <Label htmlFor={inputId} className="ml-0.5 font-normal text-muted-foreground text-sm">
          {label}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={inputId}
            variant="outline"
            className="justify-between w-48 font-normal"
          >
            {dateRange
              ? `${dateRange.from?.toLocaleDateString()} - ${dateRange.from?.toLocaleDateString()}`
              : 'Select date'
            }
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="p-0 w-auto overflow-hidden"
          align="start"
        >
          <Calendar
            mode="range"
            captionLayout="dropdown"
            defaultMonth={dateRange?.from}
            numberOfMonths={2}
            selected={dateRange}
            onSelect={(dateRange) => {
              setDateRange(dateRange)
              setOpen(false)
            }}
          />
        </PopoverContent>

      </Popover>

    </div>

  )
}
