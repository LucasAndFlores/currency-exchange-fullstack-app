import { IStatisticsBuilderResult } from './IStatisticsBuilderResult'

export interface IGetStatisticsServiceResponse {
	body: IStatisticsBuilderResult | { message: string }
	statusCode: number
}
