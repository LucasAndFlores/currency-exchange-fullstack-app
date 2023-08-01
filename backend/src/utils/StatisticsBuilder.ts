import { IGetStatisticsPrismaReponse } from '../interface/IGetStatisticsPrismaResponse'
import { IStatisticsBuilderResult } from '../interface/IStatisticsBuilderResult'

export class StatisticsBuilder {
	private result: IStatisticsBuilderResult

	constructor(private dataFromDB: IGetStatisticsPrismaReponse) {
		this.result = {
			totalRequestsMade: 0,
			sumOfTotalAmountConvertedInUSD: 0,
			mostPopularDestinationCurrency: {
				total: 0,
				currency: ''
			}
		}
	}

	mapFields(): StatisticsBuilder {
		this.result.totalRequestsMade = this.dataFromDB.totalRequestsMade.id

		if (
			this.dataFromDB.sumOfTotalAmountConvertedInUSD._sum
				.totalAmountConvertedInUSD !== null
		) {
			this.result.sumOfTotalAmountConvertedInUSD = Number(
				this.dataFromDB.sumOfTotalAmountConvertedInUSD._sum
					.totalAmountConvertedInUSD
			)
		}

		if (this.dataFromDB.mostPopularDestinationCurrency.length > 0) {
			this.result.mostPopularDestinationCurrency.currency =
				this.dataFromDB.mostPopularDestinationCurrency[0].toCurrency
			this.result.mostPopularDestinationCurrency.total =
				this.dataFromDB.mostPopularDestinationCurrency[0]._count.id
		}

		return this
	}

	build(): IStatisticsBuilderResult {
		return this.result
	}
}
