import { IValidatedBodyRequest } from '../interface/IValidatedBodyRequest'

export class TransactionDTO {
	fromCurrency: string
	destinationCurrency: string
	amountToConvert: number
	constructor(body: IValidatedBodyRequest) {
		this.fromCurrency = body.fromCurrency.toUpperCase()
		this.destinationCurrency = body.destinationCurrency.toUpperCase()
		this.amountToConvert = body.amountToConvert
	}
}
