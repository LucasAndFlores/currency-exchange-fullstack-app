import { Request, Response } from 'express'
import { ICreateTransactionService } from '../interface/ICreateTransactionService'
import { TransactionDTO } from '../dto/TransactionDTO'

export class CreateTransactionController {
	constructor(private logic: ICreateTransactionService) {}
	async handle(request: Request, response: Response): Promise<void> {
		const transactionDTO = new TransactionDTO(request.body)

		const result = await this.logic.execute(transactionDTO)

		response.status(result.statusCode)
		response.json(result.body)
	}
}
