import supertest from 'supertest'
import { EEStatusCode } from '../../src/enum/EEStatusCode'
import { successfulResponse } from '../mocks/axios/getAvailableCurrenciesFromAPIResponse/successfulResponse'
import { generateGetAvailableCurrenciesResult } from '../utils/generateGetAvailableCurrenciesResult'
import { app } from '../../src/app'

describe('integration test GET availabe-currencies', () => {
	it('should be able to get statistics', async () => {
		const currencies = generateGetAvailableCurrenciesResult(successfulResponse)
		const expectedResult = {
			statusCode: EEStatusCode.OK,
			body: {
				currencies
			}
		}

		const response = await supertest(app).get('/api/available-currencies')

		expect(response.statusCode).toBe(expectedResult.statusCode)
		expect(response.body).toStrictEqual(expectedResult.body)
	})
})
