export interface IStatisticsBuilderResult {
	totalRequestsMade: number
	sumOfTotalAmountConvertedInUSD: number
	mostPopularDestinationCurrency: {
		total: number
		currency: string
	}
}
