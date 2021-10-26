import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BitcoinModule } from './modules/bitcoin/bitcoin.module'
import { DatabaseModule } from './modules/database/database.module'

@Module({
  imports: [BitcoinModule, DatabaseModule, HttpModule,
    MongooseModule.forRoot('mongodb+srv://gama:c4lc40@cluster0.vppew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
