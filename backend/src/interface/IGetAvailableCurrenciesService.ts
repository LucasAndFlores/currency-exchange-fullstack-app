import { IGetAvailableCurrenciesServiceResponse } from './IGetAvailableCurrenciesServiceResponse'

export interface IGetAvailableCurrenciesService {
	execute(): Promise<IGetAvailableCurrenciesServiceResponse>
}
