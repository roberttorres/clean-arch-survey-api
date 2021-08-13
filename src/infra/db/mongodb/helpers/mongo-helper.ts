import { MongoClient, Collection } from 'mongodb'
import { threadId } from 'worker_threads'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },
  
  async getCollection (name: string): Promise<Collection> {
    //if (!this.client || !this.client.isConnected()) {
      if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }

}