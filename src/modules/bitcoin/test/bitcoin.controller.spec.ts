import { HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { AxiosResponse } from 'axios'
import { of } from 'rxjs'
import { BitcoinController } from '../bitcoin.controller'
import { BitcoinModule } from '../bitcoin.module'

describe('BitcoinController', () => {
  let bitcoinController: BitcoinController
  let httpService: HttpService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [BitcoinModule],
    }).compile()

    bitcoinController = app.get<BitcoinController>(BitcoinController)
    httpService = app.get<HttpService>(HttpService)
  })

  describe('root', () => {
    it('should return a bitcoin value', async () => {
      const mock = {
        ticker: [
          {
            high: 350000,
            low: 339000,
            vol: 87.04275693,
            last: 347390.25297,
            buy: 347388.46,
            sell: 347388.46074,
            open: 341250,
            date: 1635018437,
            pair: 'BRLBTC',
          },
        ],
      }

      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of({ data: mock } as AxiosResponse))

      const result = await bitcoinController.getBitcoinValue()
      expect(result).toBeTruthy()
      expect(result).toEqual(347388.46)
      expect(typeof result).toBe('number')
    })
  })
})
