import {AddAccountRepository, AddAccount, AddAccountModel, AccountModel, Hasher, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {  

  /*private readonly hasher: Hasher
  private readonly addAccountRepository: AddAccountRepository */

  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,) {
    /*this.hasher = hasher
    this.addAccountRepository = addAccountRepository */
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}