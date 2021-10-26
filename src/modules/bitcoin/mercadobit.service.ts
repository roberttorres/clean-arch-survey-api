import { HttpService } from '@nestjs/axios'
import { Injectable, NotFoundException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { MercadobitDTO, TickerDTO } from './dto/mercadobit.dto'

@Injectable()
export class MercadobitService {
  constructor(private readonly httpService: HttpService) {}

  async getBitcoinValue(): Promise<TickerDTO> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          'https://cdn.mercadobitcoin.com.br/api/tickers?pairs=BRLBTC',
        ),
      )
      const data = response.data as TickerDTO
      const transform: TickerDTO = {
        ticker: data.ticker.map((item) => {
          return {
            ...item,
            buy: Number(item.buy),
            high: Number(item.high),
            last: Number(item.last),
            low: Number(item.low),
            sell: Number(item.sell),
            open: Number(item.open),
            vol: Number(item.vol),
          } as MercadobitDTO
        }),
      }

      return transform
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
