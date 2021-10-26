import * as mongoose from 'mongoose'

export const BitcoinSchema = new mongoose.Schema({
  fractionQty: { type: Number, required: true },
  purchaseValue: { type: Number, required: false },
  bitcoinValue: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },
})

export interface Bitcoin {
  id: number
  fractionQty: number
  purchaseValue: number
  bitcoinValue: number
  purchaseDate: Date
}
