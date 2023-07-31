import { ICreateTransactionServiceResponse } from '../../src/interface/ICreateTransactionServiceResponse'
import { IGetLatestCurrencyQuotationSuccessResponse } from '../../src/interface/IGetLatestCurrencyQuotationSuccessResponse'
import { IValidatedBodyRequest } from '../../src/interface/IValidatedBodyRequest'
import { TransactionBuilder } from '../../src/utils/TransactionBuilder'

export function generateExpectedResult(
	axiosResponse: IGetLatestCurrencyQuotationSuccessResponse,
	body: IValidatedBodyRequest,
	statusCode: number
): ICreateTransactionServiceResponse {
	const { toCurrency, totalAmountConverted } = new TransactionBuilder(
		axiosResponse,
		body
	)
		.generateConversionToCurrencies()
		.getResult()

	const result = {
		statusCode: statusCode,
		body: {
			destinationCurrency: toCurrency,
			convertedAmount: totalAmountConverted
		}
	}

	return result
}
