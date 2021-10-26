import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Bitcoin } from './bitcoin.model'
import { MercadobitService } from './mercadobit.service'

@Injectable()
export class BitcoinService {
  constructor(
    private readonly mercadobitService: MercadobitService,
    @InjectModel('Bitcoin') private readonly bitcoinModel: Model<Bitcoin>,
  ) {}

  async getBitcoinValue(): Promise<number> {
    const bitcoin = await this.mercadobitService.getBitcoinValue()
    return bitcoin.ticker[0].buy
  }

  async showAll(): Promise<Bitcoin[]> {
    return this.bitcoinModel.find().exec()
  }

  async create(bitcoin: Bitcoin) {
    const result = await new this.bitcoinModel(bitcoin).save()
    return result.id
  }

  async update(id: string, bitcoin: Bitcoin) {
    return await this.bitcoinModel.findByIdAndUpdate(id, bitcoin)
  }

  async delete(id: string) {
    //return await this.bitcoinModel.findOneAndDelete({ _id: id }).exec().remove()
    const bitcoinDeleted = await this.bitcoinModel
      .findOneAndDelete({ _id: id })
      .exec()
    return bitcoinDeleted.id
  }
}
