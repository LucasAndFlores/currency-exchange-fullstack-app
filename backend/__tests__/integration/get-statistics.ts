import supertest from 'supertest'
import { app } from '../../src/app'
import { EEStatusCode } from '../../src/enum/EEStatusCode'
import { EErrorMessage } from '../../src/enum/EErrorMessage'
import { PrismaClient } from '@prisma/client'
import { ITransaction } from '../../src/interface/ITransaction'
import { StatisticsBuilder } from '../../src/utils/StatisticsBuilder'

const transactionStoredOnDatabase: ITransaction[] = [
	{
		fromCurrency: 'EUR',
		totalAmountConverted: 100,
		totalAmountConvertedInUSD: 100,
		toCurrency: 'BRL'
	},
	{
		fromCurrency: 'EUR',
		totalAmountConverted: 100,
		totalAmountConvertedInUSD: 100,
		toCurrency: 'BRL'
	}
]

let prismaClient: PrismaClient

describe('integration test POST transaction', () => {
	beforeEach(async () => {
		prismaClient = new PrismaClient()
	})

	afterEach(async () => {
		await prismaClient.transactions.deleteMany({})
		await prismaClient.$disconnect()
		jest.clearAllMocks()
	})

	it('should be able to get statistics', async () => {
		const expectedResult = {
			totalRequestsMade: 2,
			sumOfTotalAmountConvertedInUSD: 200,
			mostPopularDestinationCurrency: { total: 2, currency: 'BRL' }
		}

		await Promise.all(
			transactionStoredOnDatabase.map(async (transaction) => {
				await prismaClient.transactions.create({ data: { ...transaction } })
			})
		)

		const response = await supertest(app).get('/api/statistics')

		expect(response.statusCode).toBe(EEStatusCode.OK)
		expect(response.body).toStrictEqual(expectedResult)
	})

	it('if an unexpected error happens inside service layer, it should be handle by errorHandler class', async () => {
		jest.spyOn(StatisticsBuilder.prototype, 'build').mockImplementation(() => {
			throw new Error('integration test error')
		})

		const response = await supertest(app).get('/api/statistics')

		expect(response.statusCode).toBe(EEStatusCode.INTERNAL_SERVER_ERROR)
		expect(response.body).toStrictEqual({
			message: EErrorMessage.UNKNOWN_ERROR
		})
	})
})
