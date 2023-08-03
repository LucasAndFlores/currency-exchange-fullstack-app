import supertest from 'supertest'
import { app } from '../../src/app'
import { generateCreateTransactionResult } from '../utils/generateCreateTransactionResult'
import { getLatestCurrencyQuotation } from '../../src/utils/axios'
import { EEStatusCode } from '../../src/enum/EEStatusCode'
import { PrismaClient } from '@prisma/client'

let prismaClient: PrismaClient

describe('integration test POST transaction', () => {
	beforeEach(() => {
		prismaClient = new PrismaClient()
	})

	afterEach(async () => {
		await prismaClient.transactions.deleteMany({})
		await prismaClient.$disconnect()
		jest.clearAllMocks()
	})

	it('should be able to send a request and receive the result of operation', async () => {
		const body = {
			fromCurrency: 'EUR',
			amountToConvert: 100,
			destinationCurrency: 'USD'
		}

		const response = await supertest(app).post('/api/transaction').send(body)

		const fetchFromAPI = await getLatestCurrencyQuotation({
			fromCurrency: body.fromCurrency,
			destinationCurrency: body.destinationCurrency
		})

		const expectedResult = generateCreateTransactionResult(
			fetchFromAPI,
			body,
			200
		)

		expect(response.statusCode).toBe(EEStatusCode.OK)
		expect(response.body).toStrictEqual(expectedResult.body)
	})

	it('if the request body is missing one field, it should return a string with the error message', async () => {
		const bodyMissingAmountToConvert = {
			fromCurrency: 'EUR',
			destinationCurrency: 'USD'
		}

		const response = await supertest(app)
			.post('/api/transaction')
			.send(bodyMissingAmountToConvert)

		expect(response.statusCode).toBe(EEStatusCode.BAD_REQUEST)
		expect(response.body).toHaveProperty('message')
		expect(response.body.message).toBe(
			'amountToConvert is required and should be higher than 0'
		)
	})

	it('if the request body is missing more than one field, it should return an array of strings with the error messages', async () => {
		const bodyMissingAmountToConvert = {
			fromCurrency: 'EUR'
		}

		const response = await supertest(app)
			.post('/api/transaction')
			.send(bodyMissingAmountToConvert)

		expect(response.statusCode).toBe(EEStatusCode.BAD_REQUEST)
		expect(response.body).toHaveProperty('message')
		expect(Array.isArray(response.body.message)).toBe(true)
	})
})
