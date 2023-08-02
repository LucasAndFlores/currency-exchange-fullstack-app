import { IExternalAPIResponseStatus } from './IExternalAPIResponseStatus'

export interface IGetLatestCurrencyQuotationSuccessResponse
	extends IExternalAPIResponseStatus {
	timestamp: string
	base: string
	date: string
	rates: Record<string, number>
}
