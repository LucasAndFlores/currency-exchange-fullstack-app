interface SuccessfullResponse {
	destinationCurrency: string
	convertedAmount: number
}

export interface ICreateTransactionServiceResponse {
	body: SuccessfullResponse | { message: string }
	statusCode: number
}
