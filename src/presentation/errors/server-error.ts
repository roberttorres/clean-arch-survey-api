export class ServerError extends Error {
  constructor (stack: string) {
    super('Internal Server Error')
    this.name = 'InvalidParamError'
    this.stack = stack
  }
} 