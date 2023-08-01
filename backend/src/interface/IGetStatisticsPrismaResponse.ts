import { Decimal } from '@prisma/client/runtime/library'
import { IMostPopularDestinationCurrency } from './IMostPopularDestinationCurrency'

export interface IGetStatisticsPrismaReponse {
	totalRequestsMade: { id: number }
	mostPopularDestinationCurrency: IMostPopularDestinationCurrency[]
	sumOfTotalAmountConvertedInUSD: {
		_sum: {
			totalAmountConvertedInUSD: null | Decimal
		}
	}
}
