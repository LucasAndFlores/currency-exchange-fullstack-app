import { jest } from '@jest/globals'
import { GetAvailableCurrenciesService } from '../../src/service/GetAvailableCurrenciesService'
import axios from 'axios'
import { successfulResponse } from '../mocks/axios/getAvailableCurrenciesFromAPIResponse/successfulResponse'
import { generateGetAvailableCurrenciesResult } from '../utils/generateGetAvailableCurrenciesResult'
import { EEStatusCode } from '../../src/enum/EEStatusCode'
import { AxiosError } from 'axios'
import { EErrorMessage } from '../../src/enum/EErrorMessage'
import { errorResponse } from '../mocks/axios/getAvailableCurrenciesFromAPIResponse/errorResponse'

let getAvailableCurrenciesService: GetAvailableCurrenciesService

describe('GetAvailableCurrenciesService unit test', () => {
	beforeEach(() => {
		getAvailableCurrenciesService = new GetAvailableCurrenciesService()
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should be able to return all currencies', async () => {
		jest
			.spyOn(axios, 'get')
			.mockResolvedValueOnce({ data: successfulResponse, status: 200 })

		const result = await getAvailableCurrenciesService.execute()

		const currencies = generateGetAvailableCurrenciesResult(successfulResponse)

		const expected = {
			statusCode: EEStatusCode.OK,
			body: {
				currencies
			}
		}

		expect(result.statusCode).toBe(expected.statusCode)
		expect(result.body).toStrictEqual(expected.body)
	})

	it('If an error happens with Axios, should return an error message on the body and status code', async () => {
		jest.spyOn(axios, 'get').mockRejectedValue(new AxiosError('unit test'))

		const result = await getAvailableCurrenciesService.execute()

		const expected = {
			statusCode: EEStatusCode.SERVICE_UNAVAIBLE,
			body: {
				message: EErrorMessage.KNOWN_ERROR
			}
		}

		expect(result.statusCode).toBe(expected.statusCode)
		expect(result.body).toStrictEqual(expected.body)
	})

	it('If an error is returned from the external API, should return an error message on the body and status code', async () => {
		jest
			.spyOn(axios, 'get')
			.mockResolvedValue({ status: 200, data: errorResponse })

		const result = await getAvailableCurrenciesService.execute()

		const expected = {
			statusCode: EEStatusCode.SERVICE_UNAVAIBLE,
			body: {
				message: EErrorMessage.KNOWN_ERROR
			}
		}

		expect(result.statusCode).toBe(expected.statusCode)
		expect(result.body).toStrictEqual(expected.body)
	})
})
