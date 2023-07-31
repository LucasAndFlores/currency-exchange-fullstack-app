import { ICreateTransactionServiceResponse } from './ICreateTransactionServiceResponse'
import { IValidatedBodyRequest } from './IValidatedBodyRequest'

export interface ICreateTransactionService {
	execute(
		body: IValidatedBodyRequest
	): Promise<ICreateTransactionServiceResponse>
}
