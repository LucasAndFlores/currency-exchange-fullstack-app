interface SuccessfullResponse {
	destinationCurrency: string
	convertedAmount: number
}

interface ErrorResponse {
	message: string
}

export interface IServiceResponse {
	body: SuccessfullResponse | ErrorResponse
	statusCode: number
}
