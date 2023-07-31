import { CreateTransactionController } from '../controller/CreateTransactionController'
import { TransactionRepository } from '../repository/TransactionRepository'
import { CreateTransactionService } from '../service/CreateTransactionService'

export class CreateTransactionFactory {
	static build(): CreateTransactionController {
		const repository = new TransactionRepository()
		const service = new CreateTransactionService(repository)
		const controller = new CreateTransactionController(service)
		return controller
	}
}
