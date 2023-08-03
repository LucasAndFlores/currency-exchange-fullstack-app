import { EEStatusCode } from '../enum/EEStatusCode'
import { ErrorHandler } from '../error/ErrorHandler'
import { IAvailableCurency } from '../interface/IAvailableCurrency'
import { IGetAvailableCurrenciesService } from '../interface/IGetAvailableCurrenciesService'
import { IGetAvailableCurrenciesServiceResponse } from '../interface/IGetAvailableCurrenciesServiceResponse'
import { getAvailableCurrenciesFromAPI } from '../utils/axios'

export class GetAvailableCurrenciesService
	implements IGetAvailableCurrenciesService
{
	async execute(): Promise<IGetAvailableCurrenciesServiceResponse> {
		try {
			const apiResponse = await getAvailableCurrenciesFromAPI()

			const currencies: IAvailableCurency[] = []

			for (const [prefix, name] of Object.entries(apiResponse.symbols)) {
				currencies.push({ name, prefix })
			}

			return {
				statusCode: EEStatusCode.OK,
				body: { currencies }
			}
		} catch (error) {
			const { statusCode, body } = ErrorHandler.handle(error)
			return {
				statusCode,
				body
			}
		}
	}
}
