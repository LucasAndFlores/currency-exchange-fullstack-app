import { ITransaction } from './ITransaction'

export interface ITransactionRepository {
	insert(data: ITransaction): Promise<void>
}
