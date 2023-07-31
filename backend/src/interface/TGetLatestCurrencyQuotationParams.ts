import { IValidatedBodyRequest } from './IValidatedBodyRequest'

export type TGetLatestCurrencyQuotationParams = Omit<
	IValidatedBodyRequest,
	'amountToConvert'
>
