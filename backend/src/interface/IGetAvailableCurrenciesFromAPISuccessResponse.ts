import { IExternalAPIResponseStatus } from './IExternalAPIResponseStatus'

interface IAvailableCurrencies {
	[key: string]: string
}

export interface IGetAvailableCurrenciesFromAPISuccessResponse
	extends IExternalAPIResponseStatus {
	symbols: IAvailableCurrencies[]
}
