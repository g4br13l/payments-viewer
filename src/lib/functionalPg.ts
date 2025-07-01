


export function pipe<T>(...fns: Array<(arg: T) => T>) {
  return (input: T) =>
    fns.reduce((prevVal, fn) =>
      fn(prevVal), input)
}


