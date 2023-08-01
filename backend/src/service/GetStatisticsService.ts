import { EEStatusCode } from '../enum/EEStatusCode'
import { ErrorHandler } from '../error/ErrorHandler'
import { IGetStatisticsService } from '../interface/IGetStatisticsService'
import { IGetStatisticsServiceResponse } from '../interface/IGetStatisticsServiceResponse'
import { ITransactionRepository } from '../interface/ITransactionRepository'
import { StatisticsBuilder } from '../utils/StatisticsBuilder'

export class GetStatisticsService implements IGetStatisticsService {
	constructor(private transactionRepository: ITransactionRepository) {}
	async execute(): Promise<IGetStatisticsServiceResponse> {
		try {
			const result = await this.transactionRepository.getStatistics()
			const mappedResult = new StatisticsBuilder(result).mapFields().build()
			return {
				statusCode: EEStatusCode.OK,
				body: mappedResult
			}
		} catch (error) {
			const { statusCode, body } = ErrorHandler.handle(error)
			return {
				statusCode,
				body
			}
		}
	}
}
