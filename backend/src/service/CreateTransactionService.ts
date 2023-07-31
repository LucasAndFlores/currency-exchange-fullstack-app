import { EEStatusCode } from '../enum/EEStatusCode'
import { ErrorHandler } from '../error/ErrorHandler'
import { ICreateTransactionService } from '../interface/ICreateTransactionService'
import { ICreateTransactionServiceResponse } from '../interface/ICreateTransactionServiceResponse'
import { IGetLatestCurrencyQuotationSuccessResponse } from '../interface/IGetLatestCurrencyQuotationSuccessResponse'
import { ITransactionRepository } from '../interface/ITransactionRepository'
import { IValidatedBodyRequest } from '../interface/IValidatedBodyRequest'
import { getLatestCurrencyQuotation } from '../utils/axios'
import { TransactionBuilder } from '../utils/TransactionBuilder'

export class CreateTransactionService implements ICreateTransactionService {
	constructor(private repository: ITransactionRepository) {}
	async execute(
		body: IValidatedBodyRequest
	): Promise<ICreateTransactionServiceResponse> {
		try {
			const { fromCurrency, destinationCurrency } = body

			const converted = await getLatestCurrencyQuotation({
				fromCurrency,
				destinationCurrency
			})

			const newTransaction = new TransactionBuilder(
				converted as IGetLatestCurrencyQuotationSuccessResponse,
				body
			)
				.generateConversionToCurrencies()
				.getResult()

			await this.repository.insert(newTransaction)

			return {
				statusCode: EEStatusCode.OK,
				body: {
					destinationCurrency,
					convertedAmount: Number(newTransaction.totalAmountConverted)
				}
			}
		} catch (error) {
			const { statusCode, body } = ErrorHandler.handle(error)
			return {
				statusCode,
				body
			}
		}
	}
}
