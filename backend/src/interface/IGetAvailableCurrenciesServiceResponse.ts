import { IAvailableCurency } from './IAvailableCurrency'

export interface IGetAvailableCurrenciesServiceResponse {
	body: { currencies: IAvailableCurency[] } | { message: string }
	statusCode: number
}
