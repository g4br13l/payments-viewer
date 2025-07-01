import { useId, type ComponentProps } from "react"
import { Input } from "../raw/input"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "../raw/label"


type InputSearchPropsT = {
  label?: string
  showIcon?: boolean
  setSearchTextFn: (value: string) => void
} & ComponentProps<'input'>

export function InputSearch({
  label,
  showIcon = true,
  setSearchTextFn,
  type = 'text',
  className,
  placeholder,
  ...props
}: InputSearchPropsT) {

  const inputId = useId()

  return (

    <div className={cn("w-full", className)}>

      {label && (
        <Label htmlFor={inputId} className="my-0.5 ml-0.5 font-normal text-muted-foreground text-sm">
          {label}
        </Label>
      )}

      <div className="relative items-center">
        {showIcon && (
          <span className="top-1/2 left-2 absolute text-muted-foreground -translate-y-1/2">
            <SearchIcon className="size-4" />
          </span>
        )}
        <Input
          className={cn(showIcon && 'pl-8')}
          type={type}
          onChange={(e) => setSearchTextFn(e.target.value)}
          placeholder={placeholder ?? 'search'}
          {...props}
        />
      </div>
    </div>

  )
}
