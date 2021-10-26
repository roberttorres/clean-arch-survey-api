export class MercadobitDTO {
  high: number
  low: number
  vol: number
  last: number
  buy: number
  sell: number
  open: number
  date: number
  pair: string
}

export type TickerDTO = {
  ticker: MercadobitDTO[]
}
