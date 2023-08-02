import { ITransactionRepository } from '../interface/ITransactionRepository'
import { DatabaseError } from '../error/DatabaseError'
import { EEStatusCode } from '../enum/EEStatusCode'
import { EErrorMessage } from '../enum/EErrorMessage'
import { PrismaClient } from '@prisma/client'
import { ITransaction } from '../interface/ITransaction'
import { IGetStatisticsPrismaReponse } from '../interface/IGetStatisticsPrismaResponse'

export class TransactionRepository implements ITransactionRepository {
	private db: PrismaClient

	constructor() {
		this.db = new PrismaClient()
	}

	async insert(data: ITransaction): Promise<void> {
		try {
			await this.db.transactions.create({
				data
			})
		} catch (error) {
			console.error('A Database error happened', error)
			throw new DatabaseError(
				EEStatusCode.INTERNAL_SERVER_ERROR,
				EErrorMessage.UNKNOWN_ERROR
			)
		}
	}

	async getStatistics(): Promise<IGetStatisticsPrismaReponse> {
		try {
			const [
				totalRequestsMade,
				mostPopularDestinationCurrency,
				sumOfTotalAmountConvertedInUSD
			] = await Promise.all([
				this.db.transactions.count({
					select: {
						id: true
					}
				}),
				this.db.transactions.groupBy({
					by: ['toCurrency'],
					_count: {
						id: true
					},
					orderBy: {
						_count: {
							id: 'desc'
						}
					},
					take: 1
				}),
				this.db.transactions.aggregate({
					_sum: {
						totalAmountConvertedInUSD: true
					}
				})
			])

			return {
				totalRequestsMade,
				mostPopularDestinationCurrency,
				sumOfTotalAmountConvertedInUSD
			}
		} catch (error) {
			console.error('A Database error happened', error)
			throw new DatabaseError(
				EEStatusCode.INTERNAL_SERVER_ERROR,
				EErrorMessage.UNKNOWN_ERROR
			)
		}
	}
}
