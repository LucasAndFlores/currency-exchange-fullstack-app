import { GetStatisticsController } from '../controller/GetStatisticsController'
import { TransactionRepository } from '../repository/TransactionRepository'
import { GetStatisticsService } from '../service/GetStatisticsService'

export class GetStatisticsFactory {
	static build(): GetStatisticsController {
		const repository = new TransactionRepository()
		const service = new GetStatisticsService(repository)
		const controller = new GetStatisticsController(service)
		return controller
	}
}
