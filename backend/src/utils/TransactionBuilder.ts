import currency from 'currency.js'
import { IGetLatestCurrencyQuotationSuccessResponse } from '../interface/IGetLatestCurrencyQuotationSuccessResponse'
import { IValidatedBodyRequest } from '../interface/IValidatedBodyRequest'
import { ITransaction } from '../interface/ITransaction'

export class TransactionBuilder {
	private result: ITransaction
	private APIResponseBaseCurrency = 'EUR'
	constructor(
		private axiosResponse: IGetLatestCurrencyQuotationSuccessResponse,
		private bodyRequest: IValidatedBodyRequest
	) {
		this.result = {
			fromCurrency: '',
			toCurrency: '',
			totalAmountConverted: 0,
			totalAmountConvertedInUSD: 0
		}
	}

	generateConversionToCurrencies(): TransactionBuilder {
		if (this.bodyRequest.fromCurrency !== this.APIResponseBaseCurrency) {
			const euroQuotation =
				this.axiosResponse.rates[this.bodyRequest.fromCurrency]

			const targetCurrencyQuotation =
				this.axiosResponse.rates[this.bodyRequest.destinationCurrency]

			const dollarQuotation = this.axiosResponse.rates['USD']

			const convertedToEuro = new currency(
				this.bodyRequest.amountToConvert
			).divide(euroQuotation)

			const convertedToDestinationCurrency = convertedToEuro.multiply(
				targetCurrencyQuotation
			).value

			const convertedToDollar = convertedToEuro.multiply(dollarQuotation).value

			this.result.fromCurrency = this.bodyRequest.fromCurrency
			this.result.toCurrency = this.bodyRequest.destinationCurrency
			this.result.totalAmountConverted = convertedToDestinationCurrency
			this.result.totalAmountConvertedInUSD = convertedToDollar
		} else {
			const targetCurrencyQuotation =
				this.axiosResponse.rates[this.bodyRequest.destinationCurrency]

			const dollarQuotation = this.axiosResponse.rates['USD']

			const convertedToDollar = currency(
				this.bodyRequest.amountToConvert
			).multiply(dollarQuotation).value

			const convertedToDestinationCurrency = currency(
				this.bodyRequest.amountToConvert
			).multiply(targetCurrencyQuotation).value

			this.result.fromCurrency = this.bodyRequest.fromCurrency
			this.result.toCurrency = this.bodyRequest.destinationCurrency
			this.result.totalAmountConverted = convertedToDestinationCurrency
			this.result.totalAmountConvertedInUSD = convertedToDollar
		}

		return this
	}

	getResult(): ITransaction {
		return this.result
	}
}
