import { IGetLatestCurrencyQuotationStatus } from './IGetLatestCurrencyQuotationStatus'

export interface IGetLatestCurrencyQuotationSuccessResponse
	extends IGetLatestCurrencyQuotationStatus {
	timestamp: string
	base: string
	date: string
	rates: Record<string, number>
}
