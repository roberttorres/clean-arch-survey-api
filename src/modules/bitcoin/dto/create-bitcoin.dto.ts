import { IsDateString, IsNumber, IsPositive } from 'class-validator'

export class CreateBitCoinDTO {
  @IsNumber()
  @IsPositive()
  fractionQty: number

  @IsNumber()
  purchaseValue: number

  @IsNumber()
  bitcoinValue: number

  @IsDateString()
  purchaseDate: Date
}
