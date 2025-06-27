import type { DataOrderT } from "@/types/payment"



export function capitalizeFirst(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}


export function sortStrings (values: string[], order: DataOrderT) {
  return [...values].sort((a, b) =>
    order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
  )
}

export function sortNumbers (values: number[], order: DataOrderT) {
  return [...values].sort((a, b) =>
    order === 'asc' ? a - b : b - a
  )
}

export function txtNormalize(value: string) {
  return value.toLowerCase().trim()
}


export function sortOrderCalc(valA: string | number, valB: string | number, sort: DataOrderT) {
  if (typeof valA === 'string' && typeof valB === 'string') {
    return sort === 'asc'
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA)
  }
  else if (typeof valA === 'number' && typeof valB === 'number') {
    return sort === 'asc'
      ? valA - valB
      : valB - valA
  }
  return 0
}



