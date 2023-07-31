import { ITransactionRepository } from '../interface/ITransactionRepository'
import { DatabaseError } from '../error/DatabaseError'
import { EEStatusCode } from '../enum/EEStatusCode'
import { EErrorMessage } from '../enum/EErrorMessage'
import { PrismaClient } from '@prisma/client'
import { ITransaction } from '../interface/ITransaction'

export class TransactionRepository implements ITransactionRepository {
	private db: PrismaClient

	constructor() {
		this.db = new PrismaClient()
	}

	async insert(data: ITransaction): Promise<void> {
		const {
			fromCurrency,
			totalAmountConverted,
			totalAmountConvertedInUSD,
			toCurrency
		} = data
		try {
			await this.db.transactions.create({
				data: {
					fromCurrency,
					totalAmountConverted,
					totalAmountConvertedInUSD,
					toCurrency
				}
			})
		} catch (error) {
			console.error('A Database error happened', error)
			throw new DatabaseError(
				EEStatusCode.INTERNAL_SERVER_ERROR,
				EErrorMessage.UNKNOWN_ERROR
			)
		}
	}
}
