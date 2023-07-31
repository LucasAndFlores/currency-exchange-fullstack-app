import { IServiceResponse } from './IServiceResponse'
import { IValidatedBodyRequest } from './IValidatedBodyRequest'

export interface ICreateTransactionService {
	execute(body: IValidatedBodyRequest): Promise<IServiceResponse>
}
