import * as mongoose from 'mongoose'

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://gama:c4lc40@cluster0.vppew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      ),
  },
]
