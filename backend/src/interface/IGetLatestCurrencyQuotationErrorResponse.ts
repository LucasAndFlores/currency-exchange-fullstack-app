import { IExternalAPIResponseStatus } from './IExternalAPIResponseStatus'

export interface IGetLatestCurrencyQuotationErrorResponse
	extends IExternalAPIResponseStatus {
	error: {
		code: number
		type: string
		info: string
	}
}
