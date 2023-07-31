import { IGetLatestCurrencyQuotationStatus } from './IGetLatestCurrencyQuotationStatus'

export interface IGetLatestCurrencyQuotationErrorResponse
	extends IGetLatestCurrencyQuotationStatus {
	error: {
		code: number
		type: string
		info: string
	}
}
