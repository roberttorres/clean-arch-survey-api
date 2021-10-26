import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BitcoinController } from './bitcoin.controller'
import { BitcoinSchema } from './bitcoin.model'
import { BitcoinService } from './bitcoin.service'
import { MercadobitService } from './mercadobit.service'

@Module({
  imports: [HttpModule,
    MongooseModule.forFeature([{
      name: 'Bitcoin', schema: BitcoinSchema,
    }]),
  ],
  controllers: [BitcoinController],
  providers: [BitcoinService, MercadobitService],
})
export class BitcoinModule { }
