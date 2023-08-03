import { IExternalAPIResponseStatus } from './IExternalAPIResponseStatus'

export interface IGetAvailableCurrenciesFromAPISuccessResponse
	extends IExternalAPIResponseStatus {
	symbols: {
		[key: string]: string
	}
}
