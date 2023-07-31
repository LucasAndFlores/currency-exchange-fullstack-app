import { Request, Response } from 'express'
import { ICreateTransactionService } from '../interface/ICreateTransactionService'
import { IValidatedBodyRequest } from '../interface/IValidatedBodyRequest'

export class CreateTransactionController {
	constructor(private logic: ICreateTransactionService) {}
	async handle(request: Request, response: Response): Promise<void> {
		const body: IValidatedBodyRequest = request.body

		body.fromCurrency.toUpperCase()
		body.destinationCurrency.toUpperCase()

		const result = await this.logic.execute(body)

		response.status(result.statusCode)
		response.json(result.body)
	}
}
