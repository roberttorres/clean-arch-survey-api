import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Bitcoin } from './bitcoin.model'
import { BitcoinService } from './bitcoin.service'

@Controller('/bitcoin')
export class BitcoinController {
  constructor(private bitcoinService: BitcoinService) {}

  @Get()
  async getBitcoinValue(): Promise<number> {
    return this.bitcoinService.getBitcoinValue()
  }

  @Get('showAll')
  async findAll(): Promise<Bitcoin[]> {
    return this.bitcoinService.showAll()
  }

  @Post('create')
  create(@Body() bitcoin: Bitcoin) {
    return this.bitcoinService.create(bitcoin)
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() bitcoinAtualizado: Bitcoin) {
    return this.bitcoinService.update(id, bitcoinAtualizado)
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.bitcoinService.delete(id)
  }
}
