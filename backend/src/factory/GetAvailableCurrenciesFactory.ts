import { GetAvailableCurrenciesController } from '../controller/GetAvailableCurrenciesController'
import { GetAvailableCurrenciesService } from '../service/GetAvailableCurrenciesService'

export class GetAvailableCurrenciesFactory {
	static build(): GetAvailableCurrenciesController {
		const service = new GetAvailableCurrenciesService()
		const controller = new GetAvailableCurrenciesController(service)
		return controller
	}
}
