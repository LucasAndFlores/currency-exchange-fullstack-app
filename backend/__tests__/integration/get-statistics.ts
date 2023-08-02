import supertest from 'supertest'
import { app } from '../../src/app'
import { EEStatusCode } from '../../src/enum/EEStatusCode'
import { PrismaClient } from '@prisma/client'
import { ITransaction } from '../../src/interface/ITransaction'

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
})
