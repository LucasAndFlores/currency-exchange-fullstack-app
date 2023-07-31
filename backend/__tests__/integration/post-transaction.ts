import supertest from 'supertest'
import { app } from '../../src/app'
import { generateExpectedResult } from '../utils/generateExpectedResult'
import { getLatestCurrencyQuotation } from '../../src/utils/axios'
import { EEStatusCode } from '../../src/enum/EEStatusCode'
import { TransactionRepository } from '../../src/repository/TransactionRepository'
import { EErrorMessage } from '../../src/enum/EErrorMessage'

describe('integration test POST transaction', () => {
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

		const expectedResult = generateExpectedResult(fetchFromAPI, body, 200)

		expect(response.statusCode).toBe(EEStatusCode.OK)
		expect(response.body).toStrictEqual(expectedResult.body)
	})

	it('should not be able to send a request if the body does not contain a required field', async () => {
		const bodyMissingAmountToConvert = {
			fromCurrency: 'EUR',
			destinationCurrency: 'USD'
		}

		const response = await supertest(app)
			.post('/api/transaction')
			.send(bodyMissingAmountToConvert)

		expect(response.statusCode).toBe(EEStatusCode.BAD_REQUEST)
		expect(response.body).toHaveProperty('issues')
	})

	it('if an unexpected error happens inside service layer, it should be handle by errorHandler class', async () => {
		const body = {
			fromCurrency: 'EUR',
			amountToConvert: 100,
			destinationCurrency: 'USD'
		}

		jest
			.spyOn(TransactionRepository.prototype, 'insert')
			.mockRejectedValueOnce(new Error(' integration test'))

		const response = await supertest(app).post('/api/transaction').send(body)

		expect(response.statusCode).toBe(EEStatusCode.INTERNAL_SERVER_ERROR)
		expect(response.body).toStrictEqual({
			message: EErrorMessage.UNKNOWN_ERROR
		})
	})
})
