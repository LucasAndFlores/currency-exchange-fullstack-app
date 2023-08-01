import { IGetStatisticsServiceResponse } from './IGetStatisticsServiceResponse'

export interface IGetStatisticsService {
	execute(): Promise<IGetStatisticsServiceResponse>
}
